public class DateTimeField extends ValueField {

    public String minDateTime = null;
    public String maxDateTime = null;
    public String equalTo = null;

    public DateTimeField(JSONObject parametersJSON, boolean forSearch) throws ValidatorError {
        super(parametersJSON, forSearch);

        ValidatorObject fieldErrors = new ValidatorObject();

        if (parametersJSON != null) {

            minDateTime = Validator.fieldString("Earliest", parametersJSON, fieldErrors, false);
            if (minDateTime != null) {

                int earlyCheck = Common.isValidDateTime(minDateTime);
                if (earlyCheck == -1) {
                    fieldErrors.getOrMakeInvalid().put("Earliest", new ValidatorError(136).error);
                } else if (earlyCheck == 0) {
                    fieldErrors.getOrMakeInvalid().put("Earliest", new ValidatorError(174).error);
                }

            }

            maxDateTime = Validator.fieldString("Latest", parametersJSON, fieldErrors, false);
            if (maxDateTime != null) {

                int lateCheck = Common.isValidDateTime(maxDateTime);
                if (lateCheck == -1) {
                    fieldErrors.getOrMakeInvalid().put("Latest", new ValidatorError(136).error);
                } else if (lateCheck == 0) {
                    fieldErrors.getOrMakeInvalid().put("Latest", new ValidatorError(174).error);
                }

            }

            equalTo = Validator.fieldString("Equal To", parametersJSON, fieldErrors, false);
            if (equalTo != null) {

                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(65).error);
                } else {
                    int equalCheck = Common.isValidDateTime(equalTo);
                    if (equalCheck == -1) {
                        fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(136).error);
                    } else if (equalCheck == 0) {
                        fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(174).error);
                    }
                }

            }

            Validator.finalErrorCheck(parametersJSON, fieldErrors);
        }
    }

    @
    Override
    public void addToQuery(BoolFilterBuilder bqb, String fieldPrefix, String fieldName, Condition condition) {
        if (minDateTime != null || maxDateTime != null) {
            RangeFilterBuilder rqb = FilterBuilders.rangeFilter(fieldPrefix + fieldName);
            if (minDateTime != null) {
                condition.cost += SearchRequestHandler.costPerFilter;
                rqb.from(minDateTime);
            }
            if (maxDateTime != null) {
                condition.cost += SearchRequestHandler.costPerFilter;
                rqb.to(maxDateTime);
            }
            bqb.must(rqb);
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

        int validCheck = Common.isValidDateTime(string);
        if (validCheck == -1) {
            throw new ValidatorError(136);
        } else if (validCheck == 0) {
            throw new ValidatorError(174);
        }

        if (minDateTime != null) {
            if (string.compareTo(minDateTime) < 0) {
                throw new ValidatorError(73);
            }
        }

        if (maxDateTime != null) {
            if (string.compareTo(maxDateTime) > 0) {
                throw new ValidatorError(74);
            }
        }

    };

}