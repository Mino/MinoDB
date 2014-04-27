public class ObjectPrivilegeRetriever implements Runnable, PrivilegeListener {

    private HashMap < String, ArrayList < Object >> requestMap;
    private User user;
    private PrivilegeRetriever privilegeRetriever;
    private PrivilegeArrayListener listener;
    private ArrayList < Object > autoGrantedArray;
    private boolean forWrite;

    public ObjectPrivilegeRetriever(User user, PrivilegeArrayListener listener, boolean forWrite) {
        this.listener = listener;
        this.user = user;
        this.forWrite = forWrite;
        this.requestMap = new HashMap < String, ArrayList < Object >> ();
        this.privilegeRetriever = new PrivilegeRetriever(user, this);
        this.autoGrantedArray = new ArrayList < Object > ();
    }

    public void addPathForObject(Path path, Object obj) throws ValidatorError {

        String grantingUser = path.usernameWhichCouldGrantPrivilege(this.user.username, this.forWrite);

        if (grantingUser != null && grantingUser.equals(this.user.username)) { //Throws MinoError if path not formed correctly
            autoGrantedArray.add(obj);
            return;
        }

        if (grantingUser != null) {

            for (int i = 0; i < path.subPaths.length; i++) {
                String keyString = CouchbasePool.toKVPrivilegeKey(this.user.username, grantingUser, path.subPaths[i], forWrite);
                ArrayList < Object > existing = this.requestMap.get(keyString);
                if (existing == null) {
                    existing = new ArrayList < Object > ();
                    this.requestMap.put(keyString, existing);
                }
                existing.add(obj);
            }

            if (!forWrite) {
                for (int i = 0; i < path.subPaths.length; i++) {
                    String keyString = CouchbasePool.toKVPrivilegeKey("Public", grantingUser, path.subPaths[i], forWrite);
                    ArrayList < Object > existing = this.requestMap.get(keyString);
                    if (existing == null) {
                        existing = new ArrayList < Object > ();
                        this.requestMap.put(keyString, existing);
                    }
                    existing.add(obj);
                }
            }

        }

    }

    public void run() {

        /*
         * Search for all keys in the map and then iterate through the results, if a value is returned for a
         * key then remove all of the proceeding keys that have a more specific path (those that have the
         * retrieved key as a substring) The MinoObjects in the ArrayList have permission to be saved.
         */

        if (autoGrantedArray.size() > 0) {
            listener.privilegeArrayAvailable(this.autoGrantedArray);
        }

        this.privilegeRetriever.paths.addAll(this.requestMap.keySet());
        this.privilegeRetriever.run();

    }

    @
    Override
    public void privilegeAvailable(String path, String privilege) {
        ArrayList < Object > list = this.requestMap.get(path);
        this.requestMap.remove(path);
        listener.privilegeArrayAvailable(list);
    }

    @
    Override
    public void endOfPrivileges() {
        listener.endOfPrivileges();
    }

}