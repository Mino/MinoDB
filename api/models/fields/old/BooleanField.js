public class BooleanField extends ValueField {

    Boolean equalTo = null;

    public BooleanField(JSONObject parametersJSON, boolean forSearch) throws ValidatorError {
        super(parametersJSON, forSearch);

        if (parametersJSON != null) {

            equalTo = Validator.fieldBoolean("Equal To", parametersJSON, fieldErrors, false);
            if (equalTo != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(57).error);
                }
            }

            Validator.finalErrorCheck(parametersJSON, fieldErrors);

        }
    }

    @
    Override
    public void addToQuery(BoolFilterBuilder bqb, String fieldPrefix, String fieldName, Condition condition) {
        if (equalTo != null) {
            condition.cost += SearchRequestHandler.costPerFilter;
            bqb.must(FilterBuilders.termFilter(fieldPrefix + fieldName, equalTo));
        }
    }

    public void addToElasticMap(HashMap < String, Object > elasticFieldsMap) {
        HashMap < String, Object > last = new HashMap < String, Object > ();
        last.put("type", "boolean");
        elasticFieldsMap.put(this.name, last);
    }

    public Object parseIfPossible(Object value) {
        if (value instanceof String) {
            return Boolean.parseBoolean((String) value);
        } else {
            return value;
        }
    }

    public void checkValidity(Object value) throws ValidatorError {
        if (!(value instanceof Boolean)) {
            JSONObject expectedError = new JSONObject();
            expectedError.put("Expected", "Boolean");
            throw new ValidatorError(2, expectedError);
        }
    }

}