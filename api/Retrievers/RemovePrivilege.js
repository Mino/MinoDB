public class RemovePrivilege {

    public String username = null;
    public String removeFrom = null;
    public Path folderPath = null;
    public Boolean removeRead = null;
    RemovePrivilegesRequestHandler handler;
    public int indexInArray = 0;
    private int numOfReadItemsFound = 0;
    private int numOfWriteItemsFound = 0;
    public String sentPrivilegeReadPathString;
    public String sentPrivilegeWritePathString;
    public String receivedPrivilegeReadPathString;
    public String receivedPrivilegeWritePathString;

    public RemovePrivilege(JSONObject parameters, RemovePrivilegesRequestHandler handler, int index) throws ValidatorError {

        indexInArray = index;
        this.username = handler.user.username;
        this.handler = handler;

        ValidatorObject validator = new ValidatorObject();

        this.removeFrom = Validator.fieldString("Remove From", parameters, validator, true);
        if (this.removeFrom != null) {
            if (!Common.isValidUsername(this.removeFrom)) {
                validator.getOrMakeInvalid().put("Remove From", new ValidatorError(53).error);
            } else {
                if (this.removeFrom.equals(this.username)) {
                    validator.getOrMakeInvalid().put("Remove From", new ValidatorError(77).error);
                }
            }
        }

        String folderPathString = Validator.fieldString("Path", parameters, validator, true);
        if (folderPathString != null) {
            try {
                this.folderPath = new Path(folderPathString);
                if (!this.folderPath.usernameWhichCouldGrantPrivilege(username, true).equals(this.username)) {
                    throw new ValidatorError(75);
                }
            } catch (ValidatorError fe) {
                validator.getOrMakeInvalid().put("Path", fe.error);
            }
        }

        this.removeRead = Validator.fieldBoolean("Remove Read", parameters, validator, true);
        if (this.removeRead != null) {

        }

        Validator.finalErrorCheck(parameters, validator);

        String tildePath = Common.convertPathToTildePath(this.folderPath.toString());

        this.sentPrivilegeReadPathString = "/" + this.username + "/Privileges/Sent/" + this.removeFrom + "/Read " + tildePath;
        this.receivedPrivilegeReadPathString = "/" + this.removeFrom + "/Privileges/Received/" + this.username + "/Read " + tildePath;
        this.sentPrivilegeWritePathString = "/" + this.username + "/Privileges/Sent/" + this.removeFrom + "/Write " + tildePath;
        this.receivedPrivilegeWritePathString = "/" + this.removeFrom + "/Privileges/Received/" + this.username + "/Write " + tildePath;

        if (!(handler.getPathForRemovePrivilege(this.sentPrivilegeReadPathString, this) &&
            handler.getPathForRemovePrivilege(this.receivedPrivilegeReadPathString, this) &&
            handler.getPathForRemovePrivilege(this.sentPrivilegeWritePathString, this) &&
            handler.getPathForRemovePrivilege(this.receivedPrivilegeWritePathString, this)
        )) {
            validator.getOrMakeInvalid().put("Path", new ValidatorError(84).error);
        }

        Validator.finalErrorCheck(parameters, validator);

        parameters.put("Removed", true);
    }

    public void checkExistance(ValidatorInterface vi) {
        if (this.numOfReadItemsFound < 2) {
            vi.getOrMakeInvalid().put("" + this.indexInArray, new ValidatorError(118).error);
        }
        if (!this.removeRead && this.numOfWriteItemsFound < 2) {
            vi.getOrMakeInvalid().put("" + this.indexInArray, new ValidatorError(119).error);
        }
    }

    public void receivePathResult(String pathString) {
        try {
            if (this.receivedPrivilegeReadPathString.equals(pathString) || this.sentPrivilegeReadPathString.equals(pathString)) {
                this.numOfReadItemsFound++;
                if (this.removeRead) {
                    this.handler.addPathToDelete(pathString);
                }
            } else if (this.receivedPrivilegeWritePathString.equals(pathString) || this.sentPrivilegeWritePathString.equals(pathString)) {
                this.numOfWriteItemsFound++;
                this.handler.addPathToDelete(pathString);
            }
        } catch (JSONException e) {
            ServerDaemon.error(e);
        }
    }
}