public class CounterRequestHandler extends RequestHandler implements PrivilegeArrayListener {

    JSONObject addressObject;
    JSONObject responseObject;
    ArrayList < Pair < String, Integer >> counterAddresses;
    ArrayList < CounterModifier > allowedCounters;
    HashMap < String, ArrayList < CounterModifier >> idMap;
    ObjectPrivilegeRetriever objectPrivilegeRetriever;
    HashMap < CounterModifier, Boolean > awaitingPrivileges;
    MemcachedClient memcachedClient;

    public CounterRequestHandler(User user, JSONObject parameters) throws ValidatorError {
        super(user, parameters);
    }

    @
    Override
    public JSONObject process() throws ValidatorError {

        idMap = new HashMap < String, ArrayList < CounterModifier >> ();
        responseObject = new JSONObject();

        allowedCounters = new ArrayList < CounterModifier > ();

        awaitingPrivileges = new HashMap < CounterModifier, Boolean > ();
        objectPrivilegeRetriever = new ObjectPrivilegeRetriever(this.user, this, false);

        ValidatorObject addressVO = new ValidatorObject();

        addressObject = Validator.fieldObject("Counters", this.parameters, this, true);
        if (addressObject != null) {
            Iterator < Entry < String, Object >> iterator = addressObject.entries().iterator();
            while (iterator.hasNext()) {
                Entry < String, Object > thisPair = iterator.next();
                try {
                    RawJSON json = new RawJSON(null);
                    CounterModifier cm = new CounterModifier(thisPair.getKey(), thisPair.getValue(), json);
                    responseObject.put(thisPair.getKey(), json);
                    ArrayList < CounterModifier > idArray = idMap.get(cm.memObjectIDKey);
                    if (idArray == null) {
                        idArray = new ArrayList < CounterModifier > ();
                        idMap.put(cm.memObjectIDKey, idArray);
                    }
                    idArray.add(cm);
                } catch (ValidatorError fe) {
                    addressVO.getOrMakeInvalid().put(thisPair.getKey(), fe.error);
                }

            }
        }

        memcachedClient = CouchbasePool.getInstance().getCache();

        Map < String, Object > idRetrieval = memcachedClient.getBulk(idMap.keySet());

        Iterator < Entry < String, ArrayList < CounterModifier >>> iter = idMap.entrySet().iterator();

        while (iter.hasNext()) {
            Entry < String, ArrayList < CounterModifier >> next = iter.next();
            String mapID = next.getKey();
            ArrayList < CounterModifier > list = next.getValue();
            Object idContentsObj = idRetrieval.get(mapID);
            if (idContentsObj == null) {
                for (CounterModifier cm: list) {
                    cm.response.cloneJSONObject(new ValidatorError(114).error);
                }
            } else {
                if (!(idContentsObj instanceof String)) {
                    ServerDaemon.error(new Exception("Counter response was not a String."));
                    throw new ValidatorError(5);
                }
                String idContents = (String) idContentsObj;
                String[] split = Common.splitIDValueToVersionAndPathAndCreated(idContents);
                Path path = new Path(split[1]);
                for (CounterModifier cm: list) {
                    objectPrivilegeRetriever.addPathForObject(path, cm);
                    awaitingPrivileges.put(cm, true);
                }
            }
        }


        try {
            Validator.finalErrorCheck(null, addressVO);
        } catch (ValidatorError fe) {
            this.getOrMakeInvalid().put("Counters", fe.error);
        }
        Validator.finalErrorCheck(this.parameters, this);

        this.objectPrivilegeRetriever.run(); //Runs privilegeArrayAvailable

        for (CounterModifier cm: allowedCounters) {
            cm.getResult();
        }

        JSONObject result = new JSONObject();
        result.put("Counters", responseObject);
        return result;
    }

    @
    Override
    public void privilegeArrayAvailable(ArrayList < Object > array) {

        for (Object obj: array) {
            CounterModifier cm = (CounterModifier) obj;
            this.awaitingPrivileges.remove(cm);
            allowedCounters.add(cm);
            cm.start(memcachedClient);
        }
    }

    @
    Override
    public void endOfPrivileges() {
        Set < Entry < CounterModifier, Boolean >> entrySet = this.awaitingPrivileges.entrySet();

        for (Entry < CounterModifier, Boolean > entry: entrySet) {
            entry.getKey().response.cloneJSONObject(new ValidatorError(114).error);
        }
    }
}