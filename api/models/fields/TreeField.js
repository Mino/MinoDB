public class TreeField extends ValueField {

    public String contains = null;

    public TreeField(JSONObject parametersJSON, boolean forSearch) throws ValidatorError {
        super(parametersJSON, forSearch);

        ValidatorObject fieldErrors = new ValidatorObject();

        if (parametersJSON != null) {

            contains = Validator.fieldString("Contains", parametersJSON, fieldErrors, false);
            if (contains != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Contains", new ValidatorError(65).error);
                }
            }

            Validator.finalErrorCheck(parametersJSON, fieldErrors);
        }
    }


    @
    Override
    public void addToQuery(BoolFilterBuilder bqb, String fieldPrefix, String fieldName, Condition condition) {
        if (contains != null) {
            condition.cost += SearchRequestHandler.costPerFilter;
            bqb.must(FilterBuilders.queryFilter(QueryBuilders.matchQuery(fieldPrefix + fieldName, contains).operator(Operator.AND))); //Word search
        }
    }

    public void addToElasticMap(HashMap < String, Object > elasticFieldsMap) {
        HashMap < String, Object > last = new HashMap < String, Object > ();
        last.put("index", "not_analyzed");
        last.put("type", "object");
        last.put("dynamic", false);
        elasticFieldsMap.put(this.name, last);
    }


    /**
     * Parses the if possible.
     *
     * @param value the value
     
     * @return the object */
    public Object parseIfPossible(Object value) {
        if (value instanceof String) {
            try {
                JSONObject parseAttempt = new JSONObject((String) value);
                return parseAttempt;
            } catch (JSONException je) {

            }
        }
        return value;
    }


    public void checkValidity(Object value) throws ValidatorError {

        if (value instanceof JSONObject) {

        } else if (value instanceof String) {
            throw new ValidatorError(171);
        } else {
            JSONObject expected = new JSONObject();
            expected.put("Expected", "Object");
            throw new ValidatorError(2, expected);
        }

    }

}