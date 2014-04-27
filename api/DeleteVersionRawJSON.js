public class DeleteVersionRawJSON extends RawJSON {

    public String versionNumberKey;

    public DeleteVersionRawJSON(String string, String versionNumberKey) {
        super(string);
        this.versionNumberKey = versionNumberKey;
    }

}