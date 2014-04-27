public class FolderExistanceChecker implements Runnable {

    public TreeMap < String, ArrayList < SaveObject >> foldersToGet;

    public FolderExistanceChecker() {
        foldersToGet = new TreeMap < String, ArrayList < SaveObject >> ();
    }

    @
    Override
    public void run() {

        Map < String, Object > retrieved = CouchbasePool.getInstance().getCache().getBulk(foldersToGet.keySet());
        Set < Entry < String, Object >> objSet = retrieved.entrySet();

        for (Entry < String, Object > ent: objSet) {
            String pathName = ent.getKey();
            ArrayList < SaveObject > waitingObjects = foldersToGet.get(pathName);
            for (SaveObject fo: waitingObjects) {
                fo.reportFolderExistance(true);
            }
            foldersToGet.remove(pathName);
        }

        Set < Entry < String, ArrayList < SaveObject >>> remainingObjs = foldersToGet.entrySet();

        for (Entry < String, ArrayList < SaveObject >> ent: remainingObjs) {
            ArrayList < SaveObject > objs = ent.getValue();

            for (SaveObject fo: objs) {
                fo.reportFolderExistance(false);
            }
        }



    }

    public void addSaveObject(SaveObject fo) {
        ArrayList < SaveObject > existing = foldersToGet.get(CouchbasePool.toKVPathKey(fo.path.toString()));
        if (existing == null) {
            existing = new ArrayList < SaveObject > ();
            foldersToGet.put(CouchbasePool.toKVPathKey(fo.path.toString()), existing);
        }
        existing.add(fo);
    }



}