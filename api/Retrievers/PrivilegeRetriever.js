public class PrivilegeRetriever implements Runnable {

    public ArrayList < String > paths;
    public User user;
    public PrivilegeListener listener;

    public PrivilegeRetriever(User user, PrivilegeListener listener) {
        this.user = user;
        this.listener = listener;
        paths = new ArrayList < String > ();
    }

    @
    Override
    public void run() {

        Map < String, Object > retrieved = CouchbasePool.getInstance().getCache().getBulk(paths);

        Set < Entry < String, Object >> objSet = retrieved.entrySet();

        Iterator < Entry < String, Object >> objIter = objSet.iterator();

        while (objIter.hasNext()) {
            Entry < String, Object > ent = objIter.next();
            listener.privilegeAvailable(ent.getKey(), (String) ent.getValue());
        }

        listener.endOfPrivileges();

    }

}