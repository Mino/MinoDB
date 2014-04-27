public class EmailField extends ValueField {

    public String domain = null;
    public String prefix = null;
    public String equalTo = null;

    public EmailField(JSONObject parametersJSON, boolean forSearch) throws ValidatorError {
        super(parametersJSON, forSearch);

        ValidatorObject fieldErrors = new ValidatorObject();

        if (parametersJSON != null) {

            domain = Validator.fieldString("Domain", parametersJSON, fieldErrors, false);
            if (domain != null) {
                if (forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Domain", new ValidatorError(57).error);
                } else {
                    if (!DomainValidator.getInstance().isValid(domain)) {
                        fieldErrors.getOrMakeInvalid().put("Domain", new ValidatorError(123).error);
                    }
                }
            }

            prefix = Validator.fieldString("Prefix", parametersJSON, fieldErrors, false);
            if (prefix != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Prefix", new ValidatorError(65).error);
                }
            }

            equalTo = Validator.fieldString("Equal To", parametersJSON, fieldErrors, false);
            if (equalTo != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(65).error);
                }
            }

            Validator.finalErrorCheck(parametersJSON, fieldErrors);
        }
    }


    @
    Override
    public void addToQuery(BoolFilterBuilder bqb, String fieldPrefix, String fieldName, Condition condition) {
        if (prefix != null && prefix.length() > 0) {
            condition.cost += SearchRequestHandler.costPerFilter;
            bqb.must(FilterBuilders.queryFilter(QueryBuilders.prefixQuery(fieldPrefix + fieldName, prefix)));
        }

        if (equalTo != null) {
            condition.cost += SearchRequestHandler.costPerFilter;
            bqb.must(FilterBuilders.queryFilter(QueryBuilders.termQuery(fieldPrefix + fieldName, equalTo))); //Exactly equal to (case sensitive)
        }
    }

    public void addToElasticMap(HashMap < String, Object > elasticFieldsMap) {
        HashMap < String, Object > last = new HashMap < String, Object > ();
        last.put("type", "string");
        last.put("index", "not_analyzed");
        elasticFieldsMap.put(this.name, last);
    }


    public void checkValidity(Object value) throws ValidatorError {

        if (!(value instanceof String)) {
            JSONObject expectedError = new JSONObject();
            expectedError.put("Expected", "String");
            throw new ValidatorError(2, expectedError);
        }

        String string = (String) value;

        if (!Common.isValidEmailAddress(string)) {
            throw new ValidatorError(54);
        }

        if (domain != null) {
            String[] split = string.split("@");
            if (split.length == 2) {
                if (!domain.equals(split[1])) {
                    throw new ValidatorError(122);
                }
            }
        }

    };

}