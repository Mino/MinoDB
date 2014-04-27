public interface PrivilegeListener {

    public void privilegeAvailable(String path, String privilege);
    public void endOfPrivileges();

}