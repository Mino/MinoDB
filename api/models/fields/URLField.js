public class URLField extends ValueField {

    public String prefix = null;
    public String caseInsensitivePrefix = null;
    public String equalTo = null;
    public String caseInsensitiveEqualTo = null;

    public URLField(JSONObject parametersJSON, boolean forSearch) throws ValidatorError {
        super(parametersJSON, forSearch);

        ValidatorObject fieldErrors = new ValidatorObject();

        if (parametersJSON != null) {

            prefix = Validator.fieldString("Prefix", parametersJSON, fieldErrors, false);
            if (prefix != null) {

                if (!Common.isValidURL(prefix)) {
                    fieldErrors.getOrMakeInvalid().put("Prefix", new ValidatorError(87).error);
                }

            }

            equalTo = Validator.fieldString("Equal To", parametersJSON, fieldErrors, false);
            if (equalTo != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(65).error);
                } else if (!Common.isValidURL(equalTo)) {
                    fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(87).error);
                }

            }

            caseInsensitiveEqualTo = Validator.fieldString("Case-Insensitive Equal To", parametersJSON, fieldErrors, false);
            if (caseInsensitiveEqualTo != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Case-Insensitive Equal To", new ValidatorError(65).error);
                }
            }

            caseInsensitivePrefix = Validator.fieldString("Case-Insensitive Prefix", parametersJSON, fieldErrors, false);
            if (caseInsensitivePrefix != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Case-Insensitive Prefix", new ValidatorError(65).error);
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
            bqb.must(FilterBuilders.queryFilter(QueryBuilders.termQuery(fieldPrefix + fieldName, equalTo))); //Exactly equal to (case sensitive)
        }
        if (caseInsensitiveEqualTo != null) {
            condition.cost += SearchRequestHandler.costPerFilter;
            bqb.must(FilterBuilders.queryFilter(QueryBuilders.termQuery(fieldPrefix + fieldName + ".lowercase", caseInsensitiveEqualTo.toLowerCase()))); //Exactly equal to (case sensitive)
        }
        if (prefix != null && prefix.length() > 0) {
            condition.cost += SearchRequestHandler.costPerFilter;
            bqb.must(FilterBuilders.prefixFilter(fieldPrefix + fieldName, prefix)); //Whole value prefix (autocomplete single value, same as "phrase", but more strict as starting position must be the start of the value)
        }
        if (caseInsensitivePrefix != null && caseInsensitivePrefix.length() > 0) {
            condition.cost += SearchRequestHandler.costPerFilter;
            bqb.must(FilterBuilders.prefixFilter(fieldPrefix + fieldName + ".lowercase", caseInsensitivePrefix.toLowerCase())); //Whole value prefix (autocomplete single value, same as "phrase", but more strict as starting position must be the start of the value)
        }
    }

    public void addToElasticMap(HashMap < String, Object > elasticFieldsMap) {
        HashMap < String, Object > last = new HashMap < String, Object > ();
        last.put("type", "multi_field");


        HashMap < String, Object > fieldsMap = new HashMap < String, Object > ();

        HashMap < String, Object > nonanalyzedField = new HashMap < String, Object > ();
        nonanalyzedField.put("type", "string");
        nonanalyzedField.put("index", "not_analyzed");


        HashMap < String, Object > lowercasenonanalyzedField = new HashMap < String, Object > ();
        lowercasenonanalyzedField.put("type", "string");
        lowercasenonanalyzedField.put("analyzer", "lowercaseunanalyzed");

        fieldsMap.put("lowercase", lowercasenonanalyzedField);
        fieldsMap.put(this.name, nonanalyzedField);

        last.put("fields", fieldsMap);

        elasticFieldsMap.put(this.name, last);
    }


    public void checkValidity(Object value) throws ValidatorError {

        if (!(value instanceof String)) {
            JSONObject expectedError = new JSONObject();
            expectedError.put("Expected", "String");
            throw new ValidatorError(2, expectedError);
        }

        String string = (String) value;

        if (!Common.isValidURL(string)) {
            throw new ValidatorError(87);
        }

        if (prefix != null) {
            if (string.length() < prefix.length()) {
                throw new ValidatorError(88);
            }
            if (!string.substring(0, prefix.length()).equals(prefix)) {
                throw new ValidatorError(88);
            }
        }

    };

}