public class ClusterTypeSaver {

    //List of UserFolders
    ArrayList < String > userClusters = new ArrayList < String > ();

    //HashMap<User Folder, List<Types>>
    HashMap < String, Set < String >> userFolderAndTypes = new HashMap < String, Set < String >> ();

    //HashMap<Cluster Name, List<Types>>
    HashMap < String, Set < String >> clusterAndTypes = new HashMap < String, Set < String >> ();

    CouchbaseClient client;
    TypeRetriever typeRetriever;


    public ClusterTypeSaver(TypeRetriever typeRetriever, CouchbaseClient client) {
        this.typeRetriever = typeRetriever;
        this.client = client;
    }

    public void addItem(String userFolder, ArrayList < Object > types) {
        Set < String > typesForUserFolder = userFolderAndTypes.get(userFolder);
        if (typesForUserFolder == null) {
            typesForUserFolder = new HashSet < String > ();
            userFolderAndTypes.put(userFolder, typesForUserFolder);
            userClusters.add(CouchbasePool.toKVUserClusterKey(userFolder));
        }
        for (Object typeNameObj: types) {
            String typeName = (String) typeNameObj;
            typesForUserFolder.add(typeName);
        }
    }

    public void addUserFolderAndType(String userFolder, String typeName) {
        Set < String > typesForUserFolder = userFolderAndTypes.get(userFolder);
        if (typesForUserFolder == null) {
            typesForUserFolder = new HashSet < String > ();
            userFolderAndTypes.put(userFolder, typesForUserFolder);
            userClusters.add(CouchbasePool.toKVUserClusterKey(userFolder));
        }
        typesForUserFolder.add(typeName);
    }

    public void run() throws ValidatorError {
        //Checking existence of Types in each relevant cluster
        Map < String, Object > userClusterResults = client.getBulk(userClusters);
        if (userClusters.size() != userClusterResults.size()) {
            ServerDaemon.error(new Exception());
            throw (new ValidatorError(5));
        }

        for (Entry < String, Object > entry: userClusterResults.entrySet()) {
            //Entry is userFolder and ClusterName (if present)

            String userFolder = CouchbasePool.fromKVUserClusterKey(entry.getKey());
            String clusterName = (String) entry.getValue();

            if (clusterName == null) {
                ServerDaemon.error(new Exception());
                throw (new ValidatorError(5));
            } else {
                Set < String > typeSet = clusterAndTypes.get(clusterName);
                if (typeSet == null) {
                    typeSet = new HashSet < String > ();
                    clusterAndTypes.put(clusterName, typeSet);
                }

                Set < String > typesForUser = userFolderAndTypes.get(userFolder);

                typeSet.addAll(typesForUser);
            }
        }


        ArrayList < String > clusterExistanceKeys = new ArrayList < String > ();

        //clusterAndTypes now contains the clusterNames and Types needed for each cluster
        for (Entry < String, Set < String >> clusterEntry: clusterAndTypes.entrySet()) {
            String clusterName = clusterEntry.getKey();
            Set < String > typeNames = clusterEntry.getValue();

            for (String typeName: typeNames) {
                clusterExistanceKeys.add(CouchbasePool.toKVTypeExistanceInClusterKey(typeName, clusterName));
            }
        }

        Map < String, Object > clusterTypeExistanceMap = client.getBulk(clusterExistanceKeys);

        ArrayList < OperationFuture < Boolean >> typeExistancesToAddFutures = new ArrayList < OperationFuture < Boolean >> ();

        for (String clusterTypeKey: clusterExistanceKeys) {

            String[] clusterAndTypeName = CouchbasePool.fromKVTypeExistanceInClusterKey(clusterTypeKey);
            String typeFullName = clusterAndTypeName[0];
            String clusterKey = clusterAndTypeName[1];

            TypeVersion tv = this.typeRetriever.types.get(typeFullName);
            if (tv == null) {
                ServerDaemon.error(new Exception());
                throw new ValidatorError(5);
            }

            Object clusterPresence = clusterTypeExistanceMap.get(clusterTypeKey);

            boolean needsSaving = false;
            boolean needsUpdating = false;

            //If the map does not contain a value (key did not exist)
            if (clusterPresence == null) {
                needsSaving = true;
            } else {
                needsUpdating = true;
                String strPresence = (String) clusterPresence;
                String strRevisionNumber = "" + tv.revision;
                if (strPresence.length() > 4) {
                    if (strPresence.substring(4).equals(strRevisionNumber)) {
                        needsUpdating = false;
                    }
                }
            }

            if (needsSaving) {
                //NEED TO SAVE THE TYPE IN THE CLUSTER

                if (!clusterKey.equals(ServerDaemon.firstClusterName)) {
                    ServerDaemon.error(new Exception());
                    throw new ValidatorError(5);
                }

                //Save the Type into the user's search cluster
                if (needsUpdating) {
                    //Update the current value
                    typeExistancesToAddFutures.add(client.set(CouchbasePool.toKVTypeExistanceInClusterKey(typeFullName, clusterKey), 0, "Rev:" + tv.revision));
                } else {
                    //Add to the cluster
                    typeExistancesToAddFutures.add(client.add(CouchbasePool.toKVTypeExistanceInClusterKey(typeFullName, clusterKey), 0, "Rev:" + tv.revision));
                }


                //Create the ElasticSearch maps
                tv.createElasticFieldMap();

                ListenableActionFuture < PutMappingResponse > mapResp = null;
                if (!tv.elasticFieldsMap.isEmpty()) {
                    mapResp = ElasticSearchNode.createMapping(typeFullName, tv.elasticFieldsMap);
                }
                if (mapResp != null) {
                    mapResp.actionGet().isAcknowledged();
                } else {
                    ServerDaemon.error(new Exception());
                    throw new ValidatorError(5);
                }
            }
        }

        for (OperationFuture < Boolean > future: typeExistancesToAddFutures) {
            try {
                future.get();
            } catch (Exception e) {
                ServerDaemon.error(e);
                throw new ValidatorError(5);
            }
        }
    }
}