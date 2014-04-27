public class CounterModifier {

    public String objectID;
    public String memObjectIDKey;
    public String fullAddress;
    public RawJSON response;
    public Future < Long > changedFuture = null;
    public Future < Object > getFuture = null;
    public Future < Boolean > setFuture = null;
    Long setTo = null;

    //0 if only retrieving
    public Integer change;

    public CounterModifier(String address, Object requestObject, RawJSON json) throws ValidatorError {
        this.objectID = Common.idFromCounterAddress(address);
        this.memObjectIDKey = CouchbasePool.toKVIDKey(this.objectID);
        if (requestObject instanceof JSONObject) {
            try {
                JSONObject jsonSet = (JSONObject) requestObject;
                setTo = jsonSet.getLong("Set");
                if (setTo == null) {
                    throw new ValidatorError(113);
                }
                if (setTo < 0) {
                    throw new ValidatorError(115);
                }
            } catch (JSONException je) {
                throw new ValidatorError(113);
            }
        } else if ((requestObject instanceof Integer)) {
            this.change = (Integer) requestObject;
        } else {
            throw new ValidatorError(113);
        }
        this.fullAddress = address;
        this.response = json;
    }

    public void start(MemcachedClient client) {
        if (setTo != null) {
            setFuture = client.set(CouchbasePool.toKVCounterKey(fullAddress), 0, setTo);
        } else if (change == 0) {
            getFuture = client.asyncGet(CouchbasePool.toKVCounterKey(fullAddress));
        } else if (change < 0) {
            changedFuture = client.asyncDecr(CouchbasePool.toKVCounterKey(fullAddress), Math.abs(change));
        } else {
            changedFuture = client.asyncIncr(CouchbasePool.toKVCounterKey(fullAddress), change);
        }
    }

    public void getResult() {
        try {
            if (setFuture != null) {
                Boolean getResult = setFuture.get();
                if (getResult) {
                    response.setString(setTo.toString());
                } else {
                    response.cloneJSONObject(new ValidatorError(114).error);
                }
                return;
            }
            if (getFuture != null) {
                Object getResult = getFuture.get();
                if (getResult == null) {
                    response.cloneJSONObject(new ValidatorError(114).error);
                } else {
                    response.setString(getResult.toString());
                }
                return;
            }
            if (changedFuture != null) {
                Long changedResult = changedFuture.get();
                if (changedResult == null || changedResult == -1) {
                    response.cloneJSONObject(new ValidatorError(114).error);
                } else {
                    response.setString(changedResult.toString());
                }
                return;
            }
        } catch (Exception ex) {
            ServerDaemon.error(ex);
        }
    }

}