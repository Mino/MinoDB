public class CounterObject {

    public CounterField field;
    public SaveObject object;
    public JSONObject fieldMap;
    public Long setTo = null;
    public String fullName;
    public Future < Boolean > setFuture = null;
    public Future < Boolean > addFuture = null;
    public Future < Object > getFuture = null;

    public CounterObject(SaveObject fo, CounterField cf, JSONObject objFields, Long setTo) {
        this.setTo = setTo;
        this.fieldMap = objFields;
        object = fo;
        field = cf;
    }

    public String compileFullName() {
        this.fullName = object.id + "." + field.parentType.fullVersionName + "." + field.name;
        return this.fullName;
    }

    public void membaseAddFuture(Future < Boolean > fut) {
        addFuture = fut;
    }

    public void membaseGetValueFuture(Future < Object > fut) {
        getFuture = fut;
    }

    public void membaseSaveFuture(Future < Boolean > fut) {
        setFuture = fut;
    }

    public Long finalProcessing() throws InterruptedException, ExecutionException {
        if (getFuture != null) {
            Object obj = getFuture.get();
            Long result = null;
            if (obj != null) {
                if (obj instanceof String) {
                    result = Long.parseLong((String) obj);
                    //Avoid throwing an exception because the value must be numeric to have been saved
                } else if (obj instanceof Long) {
                    result = (Long) obj;
                }
            }
            if (result != null) {
                fieldMap.put(field.name, result);
            } else {
                Boolean didAdd = addFuture.get();
                if (!didAdd.booleanValue()) {}
                result = 0L;
            }
            return result;
        } else {
            Boolean didSet = setFuture.get();
            if (!didSet.booleanValue()) {}
            return setTo;
        }
    }

}