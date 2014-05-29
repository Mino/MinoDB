public class TypeField extends ValueField {

    public Boolean versionsAllowed = null;
    public Boolean namespaceAllowed = null;
    public String prefix = null;
    public String equalTo = null;

    public TypeField(JSONObject parametersJSON, boolean forSearch) throws ValidatorError {
        super(parametersJSON, forSearch);

        ValidatorObject fieldErrors = new ValidatorObject();

        if (parametersJSON != null) {

            namespaceAllowed = Validator.fieldBoolean("Namespaces Allowed", parametersJSON, fieldErrors, false);
            if (namespaceAllowed != null) {
                if (forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Namespaces Allowed", new ValidatorError(57).error);
                }
            }

            versionsAllowed = Validator.fieldBoolean("Versions Allowed", parametersJSON, fieldErrors, false);
            if (versionsAllowed != null) {
                if (forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Versions Allowed", new ValidatorError(57).error);
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

        }

        if (!forSearch && (namespaceAllowed == null || !(namespaceAllowed)) && (versionsAllowed == null || !(versionsAllowed))) {
            fieldErrors.getOrMakeInvalid().put("Namespaces Allowed", new ValidatorError(63).error);
            fieldErrors.getOrMakeInvalid().put("Versions Allowed", new ValidatorError(63).error);
        }

        Validator.finalErrorCheck(parametersJSON, fieldErrors);
    }



    @
    Override
    public void addToQuery(BoolFilterBuilder bqb, String fieldPrefix, String fieldName, Condition condition) {

        if (prefix != null && !prefix.equals("")) {
            condition.cost += SearchRequestHandler.costPerFilter;
            bqb.must(FilterBuilders.prefixFilter(fieldPrefix + fieldName, prefix));
        }

        if (equalTo != null) {
            condition.cost += SearchRequestHandler.costPerFilter;
            bqb.must(FilterBuilders.termFilter(fieldPrefix + fieldName, equalTo));
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

        boolean accepted = false;

        if (versionsAllowed != null && versionsAllowed) {
            if (Common.isValidTypeVersionName(string)) {
                accepted = true;
            } else if (namespaceAllowed != null && !(namespaceAllowed)) {
                throw new ValidatorError(23);
            }
        }

        if (!accepted && namespaceAllowed != null && namespaceAllowed) {
            if (Common.isValidTypeName(string)) {
                accepted = true;
            } else if (versionsAllowed != null && !(versionsAllowed)) {
                throw new ValidatorError(48);
            }
        } else {
            if (!accepted) {
                throw new ValidatorError(47);
            }
        }

    }

}