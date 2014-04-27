public class TypeRetriever implements Runnable {

    public HashMap < String, Pair < TypeVersion, ArrayList < TypeVersionListener >>> requestList;
    public ArrayList < String > toRetrieve;

    //Retrieved types
    public HashMap < String, TypeVersion > types = new HashMap < String, TypeVersion > ();

    private User user;

    //Get with descriptions
    private boolean getDetailedTypes = false;

    public TypeRetriever(User user) {
        requestList = new HashMap < String, Pair < TypeVersion, ArrayList < TypeVersionListener >>> ();
        toRetrieve = new ArrayList < String > ();
        this.user = user;
    }

    public void setGetDetailed(boolean getDetailed) {
        this.getDetailedTypes = getDetailed;
    }

    public void requestTypeVersionNameWithListener(String typeVersionName, TypeVersionListener listener) {

        Pair < TypeVersion, ArrayList < TypeVersionListener >> existing = requestList.get(typeVersionName);
        if (existing == null) {

            ArrayList < TypeVersionListener > newArray = new ArrayList < TypeVersionListener > ();
            TypeVersion tv = new TypeVersion(typeVersionName);
            existing = new Pair < TypeVersion, ArrayList < TypeVersionListener >> (tv, newArray);
            if (this.getDetailedTypes) {
                toRetrieve.add(CouchbasePool.toKVDetailedTypeVersionKey(typeVersionName));
            } else {
                toRetrieve.add(CouchbasePool.toKVFunctionalTypeVersionKey(typeVersionName));
            }
            requestList.put(typeVersionName, existing);
        }

        TypeVersion tv = existing.left;
        existing.right.add(listener);

        if (!tv.typeCreatorUsername.equals(this.user.username)) {
            toRetrieve.add(CouchbasePool.toKVPathKey("/" + this.user.username + "/Type Privileges/Received/" + tv.typeCreatorUsername + "/" + tv.fullVersionName));
            toRetrieve.add(CouchbasePool.toKVPathKey("/Public/Type Privileges/Received/" + tv.typeCreatorUsername + "/" + tv.fullVersionName));
        }
    }

    public void run() {

        MemcachedClient client = CouchbasePool.getInstance().getCache();

        Map < String, Object > memGot = client.getBulk(toRetrieve);

        for (Entry < String, Pair < TypeVersion, ArrayList < TypeVersionListener >>> thisEntry: requestList.entrySet()) {

            Pair < TypeVersion, ArrayList < TypeVersionListener >> thisPair = thisEntry.getValue();

            TypeVersion tv = thisPair.left;

            String fromStore;
            if (this.getDetailedTypes) {
                fromStore = (String) memGot.get(CouchbasePool.toKVDetailedTypeVersionKey(tv.fullVersionName));
            } else {
                fromStore = (String) memGot.get(CouchbasePool.toKVFunctionalTypeVersionKey(tv.fullVersionName));
            }

            if (fromStore == null) {
                for (TypeVersionListener tvl: thisPair.right) {
                    if (tvl != null) {
                        tvl.typeVersionNotAvailable(tv);
                    }
                }
            } else {

                JSONObject retrievedType = null;
                try {
                    retrievedType = new JSONObject(fromStore);
                } catch (JSONException e) {
                    ServerDaemon.error(e);
                }
                try {
                    tv.initialize(retrievedType);
                } catch (ValidatorError e) {
                    ServerDaemon.error(e);
                }


                if (!tv.typeCreatorUsername.equals(this.user.username)) {
                    if (
                        memGot.get(CouchbasePool.toKVPathKey("/" + this.user.username + "/Type Privileges/Received/" + tv.typeCreatorUsername + "/" + tv.fullVersionName)) != null ||
                        memGot.get(CouchbasePool.toKVPathKey("/Public/Type Privileges/Received/" + tv.typeCreatorUsername + "/" + tv.fullVersionName)) != null
                    ) {
                        //Only add to retrieved types if it is accessible
                        types.put(tv.fullVersionName, tv);

                        for (TypeVersionListener typeListener: thisPair.right) {
                            if (typeListener != null) {
                                typeListener.typeVersionAvailable(tv);
                            }
                        }

                    } else {

                        for (TypeVersionListener typeListener: thisPair.right) {
                            if (typeListener != null) {
                                typeListener.typeVersionNotAvailable(tv);
                            }
                        }
                    }
                } else {
                    types.put(tv.fullVersionName, tv);
                    for (TypeVersionListener typeListener: thisPair.right) {
                        if (typeListener != null) {
                            typeListener.typeVersionAvailable(tv);
                        }
                    }
                }
            }
        }
    }

}