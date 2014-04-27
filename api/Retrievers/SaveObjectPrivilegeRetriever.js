public class SaveObjectPrivilegeRetriever {

    private String[] paths;
    private GetFuture < Object > [] futures;
    private int totalPaths;

    private String username;

    private Boolean immediateResult = null;

    public SaveObjectPrivilegeRetriever(CouchbaseClient client, String username, Path path) {
        this.username = username;

        String grantingUser = path.usernameWhichCouldGrantPrivilege(this.username, true);

        if (grantingUser == null) {
            immediateResult = false;
        } else if (grantingUser.equals(username)) {
            immediateResult = true;
        } else {
            int subPathsToCheck = (path.isFolder() ? path.subPaths.length : path.subPaths.length - 1);
            this.totalPaths = subPathsToCheck - 1;
            this.paths = new String[totalPaths];
            this.futures = new GetFuture[totalPaths];
            for (int i = 1; i < subPathsToCheck; i++) { //No point in checking /Username/ folder because it can't be shared.
                String keyString = CouchbasePool.toKVPrivilegeKey(this.username, grantingUser, path.subPaths[i], true);
                this.paths[i - 1] = path.subPaths[i];
                this.futures[i - 1] = client.asyncGet(keyString);
            }
        }
    }

    public boolean isGranted() {
        try {
            if (immediateResult != null) {
                return immediateResult;
            }
            for (int i = 0; i < totalPaths; i++) {
                Object result = futures[i].get();
                if (result != null) {
                    //There was a privilege
                    return true;
                }
            }
        } catch (Exception e) {
            ServerDaemon.error(e);
        }
        return false;
    }

}