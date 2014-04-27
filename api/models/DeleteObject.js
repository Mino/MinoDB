public class DeleteObject extends minocloud.validator.ValidatorObject {

    private DeleteRequestHandler handler;
    private boolean performPrivilegeChecks = false;

    public Long id = null;
    public Path deletePath = null;
    private boolean deletingByPath = false;

    private RawJSON requestJSON;

    //Saving fields
    boolean finishedSaving = false;
    public boolean shouldIndex = false;
    public String withinAppFolderName = null;

    public DeleteObject(RawJSON json, Long id, DeleteRequestHandler handler, boolean performPrivilegeChecks) {
        deletingByPath = false;
        this.requestJSON = json;
        this.id = id;
        this.handler = handler;
        this.performPrivilegeChecks = performPrivilegeChecks;
    }

    public DeleteObject(RawJSON json, Path deletePath, DeleteRequestHandler handler, boolean performPrivilegeChecks) {
        deletingByPath = true;
        this.requestJSON = json;
        this.deletePath = deletePath;
        this.oldParentPath = deletePath.parentPath();
        this.handler = handler;
        this.performPrivilegeChecks = performPrivilegeChecks;
    }


    private int stage = 1;

    //Stage 1
    private SaveObjectPrivilegeRetriever pathPrivilegeRetriever;
    private Future < CASValue < Object >> casGetIDFuture;
    private Future < Object > idGetFuture;
    private Future < CASValue < Object >> casGetOldPathFuture;
    private Future < Object > oldPathGetFuture;
    private Future < Object > getChildNumberFuture;

    //Stage 2
    private CASValue < Object > idCAS;
    private CASValue < Object > pathCAS;
    private Path oldParentPath;
    private OperationFuture < Boolean > didUnlockIDFuture = null;
    private OperationFuture < Boolean > didUnlockPathFuture = null;

    //Stage 5
    private Future < Long > didDecreaseParentFuture;
    private Future < Boolean > didDeleteChildCountFuture;
    private Future < Boolean > didDeletePathFuture;
    private Future < Boolean > didDeleteIDFuture;


    private void revertChanges(CouchbaseClient client) {

        if (id != null && idCAS != null) {
            client.asyncUnlock(CouchbasePool.toKVIDKey(id), idCAS.getCas());
        }
        if (deletePath != null && pathCAS != null) {
            client.asyncUnlock(CouchbasePool.toKVPathKey(this.deletePath.toString()), pathCAS.getCas());
        }
    }


    public boolean doDeleting(CouchbaseClient client) throws InterruptedException, ExecutionException { //returns true if saving is complete

        if (finishedSaving) {
            return true;
        }

        boolean toReturn = false;

        if (stage == 1) {
            if (didUnlockIDFuture != null) {
                didUnlockIDFuture.get();
                didUnlockIDFuture = null;

                idGetFuture = null;
                casGetIDFuture = null;
            }
            if (didUnlockPathFuture != null) {
                didUnlockPathFuture.get();
                didUnlockPathFuture = null;

                casGetOldPathFuture = null;
            }

            if (id != null) {
                casGetIDFuture = client.asyncGetAndLock(CouchbasePool.toKVIDKey(id), 3);
                idGetFuture = client.asyncGet(CouchbasePool.toKVIDKey(id));
            }

            if (deletePath != null) {
                if (deletePath.isFolder()) {
                    getChildNumberFuture = client.asyncGet(CouchbasePool.toKVChildCountKey(this.deletePath.toString()));
                }
                if (this.performPrivilegeChecks && this.pathPrivilegeRetriever == null) {
                    this.pathPrivilegeRetriever = new SaveObjectPrivilegeRetriever(client, this.handler.user.username, deletePath);
                }
                casGetOldPathFuture = client.asyncGetAndLock(CouchbasePool.toKVPathKey(this.deletePath.toString()), 3);
                oldPathGetFuture = client.asyncGet(CouchbasePool.toKVPathKey(this.deletePath.toString()));
            } else {
                this.pathPrivilegeRetriever = null;
            }
        }
        if (stage == 2) {

            boolean gotPathLock = false;
            boolean gotIDLock = false;
            boolean encounteredError = false;

            if (deletingByPath) {
                pathCAS = casGetOldPathFuture.get();
                if (pathCAS.getValue() != null) {
                    gotPathLock = true;

                    Long[] split = Common.splitToIDAndVersion((String) pathCAS.getValue());
                    Long retrievedID = split[0];
                    this.id = retrievedID;
                    if (this.id == null) {
                        this.id = retrievedID;
                    } else if (this.id != retrievedID) {
                        encounteredError = true;
                        this.id = retrievedID;
                    } else {
                        //The ID retrieved by the path is the same as the ID already retrieved
                    }
                }

                if (casGetIDFuture != null) {
                    idCAS = casGetIDFuture.get();
                    if (idCAS.getValue() != null) {
                        gotIDLock = true;
                    }
                } else {

                }
            } else {
                idCAS = casGetIDFuture.get();
                if (idCAS.getValue() != null) {
                    gotIDLock = true;
                    try {
                        String[] versionAndCreated = Common.splitIDValueToVersionAndPathAndCreated((String) idCAS.getValue());
                        String pathForID = versionAndCreated[1];
                        if (deletePath == null) {
                            deletePath = new Path(pathForID);
                        } else if (!(deletePath.toString().equals(pathForID))) {
                            encounteredError = true;
                            deletePath = new Path(pathForID);
                            this.pathPrivilegeRetriever = null; //Remove the old privilege retriever because it is for the old path
                        } else {
                            //The path retrieved by the ID is the same as the path already retrieved
                        }
                        oldParentPath = deletePath.parentPath();
                    } catch (ValidatorError fe) {
                        ServerDaemon.error(fe);
                        requestJSON.cloneJSONObject(new ValidatorError(5).error);
                        finishedSaving = true;
                        this.revertChanges(client);
                        return true;

                    }
                }

                if (casGetOldPathFuture != null) {
                    pathCAS = casGetOldPathFuture.get();
                    if (pathCAS.getValue() != null) {
                        gotPathLock = true;
                    }
                } else {

                }
            }

            if (idGetFuture != null) {
                if (idGetFuture.get() == null) {
                    requestJSON.cloneJSONObject(new ValidatorError(80).error);
                    finishedSaving = true;
                    this.revertChanges(client);
                    return true;
                }
            }

            if (oldPathGetFuture != null) {
                if (oldPathGetFuture.get() == null) {
                    requestJSON.cloneJSONObject(new ValidatorError(80).error);
                    finishedSaving = true;
                    this.revertChanges(client);
                    return true;
                }
            }

            casGetIDFuture = null;
            idGetFuture = null;
            casGetOldPathFuture = null;
            oldPathGetFuture = null;

            if (this.pathPrivilegeRetriever != null) {
                if (!this.pathPrivilegeRetriever.isGranted()) {
                    requestJSON.cloneJSONObject(new ValidatorError(80).error);
                    finishedSaving = true;
                    this.revertChanges(client);
                    return true;
                }
            }

            if (getChildNumberFuture != null && this.deletePath.isFolder()) {
                Long childCount = Long.parseLong(getChildNumberFuture.get().toString());
                if (childCount > 0) {
                    requestJSON.cloneJSONObject(new ValidatorError(105).error);
                    finishedSaving = true;
                    this.revertChanges(client);
                    return true;
                }
            }

            if (encounteredError || !(gotIDLock && gotPathLock)) {
                if (gotIDLock) {
                    didUnlockIDFuture = client.asyncUnlock(CouchbasePool.toKVIDKey(id), idCAS.getCas());
                }
                if (gotPathLock) {
                    didUnlockPathFuture = client.asyncUnlock(CouchbasePool.toKVPathKey(this.deletePath.toString()), pathCAS.getCas());
                }
                stage = 1;
                return false;
            }

            //Both locks acquired
            didUnlockPathFuture = client.asyncUnlock(CouchbasePool.toKVPathKey(this.deletePath.toString()), pathCAS.getCas());
            didDeletePathFuture = client.delete(CouchbasePool.toKVPathKey(this.deletePath.toString()));

            if (this.deletePath.isFolder()) {
                didDeleteChildCountFuture = client.delete(CouchbasePool.toKVChildCountKey(this.deletePath.toString()));
            }

            didUnlockIDFuture = client.asyncUnlock(CouchbasePool.toKVIDKey(id), idCAS.getCas());
            didDeleteIDFuture = client.delete(CouchbasePool.toKVIDKey(id));

            didDecreaseParentFuture = client.asyncDecr(CouchbasePool.toKVChildCountKey(oldParentPath.toString()), 1);
        }

        if (stage == 3) {

            boolean didUnlockPath = didUnlockPathFuture.get();
            boolean didDeletePath = didDeletePathFuture.get();
            boolean didDeleteChildCount = true;
            if (this.deletePath.isFolder()) {
                didDeleteChildCount = didDeleteChildCountFuture.get();
            }
            boolean didUnlockID = didUnlockIDFuture.get();
            boolean didDeleteID = didDeleteIDFuture.get();
            Long didDecreaseParent = didDecreaseParentFuture.get();

            if (!(didUnlockPath && didDeletePath && didDeleteChildCount && didUnlockID && didDeleteID && didDecreaseParent != null)) {

                JSONObject internalError = new JSONObject();
                internalError.put("didUnlockPath", didUnlockPath);
                internalError.put("didDeletePath", didDeletePath);
                internalError.put("didDeleteChildCount", didDeleteChildCount);
                internalError.put("didUnlockID", didUnlockID);
                internalError.put("didDeleteID", didDeleteID);
                internalError.put("didDecreaseParent", didDecreaseParent);

                ServerDaemon.error(new ValidatorError(5, internalError));
                requestJSON.cloneJSONObject(new ValidatorError(5).error);
                finishedSaving = true;
                return true;
            }
            stage++;

            finishedSaving = true;
            shouldIndex = true;
            requestJSON.setString("{\"Deleted\":true}");

            if (this.deletePath.length() >= 3) {
                if (this.deletePath.objectNames[1].equals("Apps")) {
                    this.withinAppFolderName = this.deletePath.objectNames[2];
                }
            }

            return true;
        }
        stage++;
        return toReturn;
    }

}