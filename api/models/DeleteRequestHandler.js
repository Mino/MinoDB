public class DeleteRequestHandler extends RequestHandler {

    public static final int maximumDelete = 1000;
    public int totalDeleting = 0;
    boolean performPrivilegeChecks = false;
    private JSONArray objectArray;
    ValidatorObject deletingValidator;

    public DeleteRequestHandler(User user, JSONObject parameters) throws ValidatorError {
        super(user, parameters);
    }

    @
    Override
    public JSONObject process() throws ValidatorError {
        performPrivilegeChecks = true;
        return this.performProcessing();
    }

    public JSONObject processWithoutChecks(JSONArray objectArray) throws ValidatorError { //This method saves without performing privilege checks
        performPrivilegeChecks = false;
        this.objectArray = objectArray;
        return this.performProcessing();
    }

    private JSONObject performProcessing() throws ValidatorError {

        this.deletingValidator = new ValidatorObject(true);

        DeleteObject[] deletingObjects = new DeleteObject[1];

        if (this.objectArray == null) {
            this.objectArray = Validator.fieldArray("Delete", this.parameters, this, true);
        }
        try {

            if (objectArray != null) {

                if (objectArray.length() > DeleteRequestHandler.maximumDelete) {
                    throw new ValidatorError(151);
                }

                deletingObjects = new DeleteObject[objectArray.length()];

                ListIterator < Object > iterator = objectArray.listIterator();
                while (iterator.hasNext()) {
                    int index = iterator.nextIndex();
                    Object thisAddress = iterator.next();
                    boolean handled = false;
                    if (thisAddress instanceof Integer) {
                        thisAddress = Long.parseLong(thisAddress.toString());
                    }

                    if (thisAddress instanceof String) {

                        int firstChar = (int)((String) thisAddress).charAt(0);
                        if (firstChar == 47) { //'/' Path

                            try {
                                Path addressPath = new Path((String) thisAddress);

                                RawJSON thisObject = new RawJSON(null);
                                DeleteObject item = new DeleteObject(thisObject, addressPath, this, this.performPrivilegeChecks);
                                iterator.set(thisObject);
                                deletingObjects[totalDeleting] = item;
                                totalDeleting++;
                                handled = true;

                            } catch (ValidatorError fe) {
                                deletingValidator.getOrMakeInvalid().put("" + index, fe.error);
                            }
                        } else {

                            boolean didFindError = false;

                            for (int len = 0; len < ((String) thisAddress).length(); len++) {
                                int thisChar = ((String) thisAddress).charAt(len);
                                if (thisChar < 48 || thisChar > 57) { //Other than 0 to 9
                                    deletingValidator.getOrMakeInvalid().put("" + index, new ValidatorError(38).error);
                                    didFindError = true;
                                }
                            }

                            if (!didFindError) {
                                thisAddress = Long.parseLong((String) thisAddress);
                            }
                        }
                    }

                    if (thisAddress instanceof Long && (Long) thisAddress > 0) {
                        RawJSON thisObject = new RawJSON(null);
                        DeleteObject item = new DeleteObject(thisObject, (Long) thisAddress, this, this.performPrivilegeChecks);
                        iterator.set(thisObject);
                        deletingObjects[totalDeleting] = item;
                        totalDeleting++;
                    } else if (!handled) {
                        ValidatorError err = new ValidatorError(11);
                        deletingValidator.getOrMakeInvalid().put("" + index, err.error);
                    }
                }
            }

        } catch (JSONException ex) {
            ServerDaemon.error(ex);
            throw new ValidatorError(5);
        }

        try {
            Validator.finalErrorCheck(null, deletingValidator);
        } catch (ValidatorError fe) {
            this.getOrMakeInvalid().put("Delete", fe.error);
        }
        Validator.finalErrorCheck(this.parameters, this);

        this.deleteObjects(deletingObjects);

        JSONObject toReturn = new JSONObject();

        toReturn.put("Objects", objectArray);

        return toReturn;
    }

    public void deleteObjects(DeleteObject[] deletingObjects) throws ValidatorError {

        CouchbaseClient client = CouchbasePool.getInstance().getCache();

        try {

            boolean completeFreePass = false;
            while (!completeFreePass) {
                completeFreePass = true;
                for (int i = 0; i < deletingObjects.length; i++) {
                    DeleteObject obj = deletingObjects[i];
                    if (!obj.doDeleting(client)) {
                        completeFreePass = false;
                    }
                }
            }

        } catch (Exception ex) {
            ServerDaemon.error(ex);
        }

        Client elasticClient = ElasticSearchNode.getInstance().getClient();

        BulkRequestBuilder bulkRequest = elasticClient.prepareBulk();

        int totalConfirmedDeletes = 0;

        for (int i = 0; i < deletingObjects.length; i++) {
            DeleteObject obj = deletingObjects[i];
            if (obj.shouldIndex) {
                totalConfirmedDeletes++;
                bulkRequest.add(
                    elasticClient
                    .prepareDelete(ServerDaemon.firstClusterName, "minoobject", "" + obj.id)
                    .setRouting("User." + obj.deletePath.objectNames[0])
                );

                if (obj.withinAppFolderName != null) {
                    bulkRequest.add(
                        elasticClient
                        .prepareDelete(ServerDaemon.firstClusterName, "minoobject", "APP:" + obj.id)
                        .setRouting("App." + obj.withinAppFolderName)
                    );
                }
            }
        }

        APIRole.deletedObjects(totalConfirmedDeletes);

        if (bulkRequest.numberOfActions() > 0) {

            bulkRequest.setRefresh(true);

            BulkResponse bulkResponse = bulkRequest.execute().actionGet();
            if (bulkResponse.hasFailures()) {
                ServerDaemon.error(new Exception(bulkResponse.buildFailureMessage()));
                throw new ValidatorError(5);
            }

        }
    }

    public String getCurrentTime() {
        return Common.getDateTimeString(Common.SECONDSDATEFORMAT);
    }
}