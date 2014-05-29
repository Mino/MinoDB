public class DateField extends ValueField {

    public String minDate = null;
    public String maxDate = null;
    public String equalTo = null;

    public DateField(JSONObject parametersJSON, boolean forSearch) throws ValidatorError {
        super(parametersJSON, forSearch);

        ValidatorObject fieldErrors = new ValidatorObject();

        if (parametersJSON != null) {

            minDate = Validator.fieldString("Earliest", parametersJSON, fieldErrors, false);
            if (minDate != null) {

                int earlyCheck = Common.isValidDate(minDate);
                if (earlyCheck == -1) {
                    fieldErrors.getOrMakeInvalid().put("Earliest", new ValidatorError(72).error);
                } else if (earlyCheck == 0) {
                    fieldErrors.getOrMakeInvalid().put("Earliest", new ValidatorError(81).error);
                }

            }

            maxDate = Validator.fieldString("Latest", parametersJSON, fieldErrors, false);
            if (maxDate != null) {

                int lateCheck = Common.isValidDate(maxDate);
                if (lateCheck == -1) {
                    fieldErrors.getOrMakeInvalid().put("Latest", new ValidatorError(72).error);
                } else if (lateCheck == 0) {
                    fieldErrors.getOrMakeInvalid().put("Latest", new ValidatorError(81).error);
                }

            }

            equalTo = Validator.fieldString("Equal To", parametersJSON, fieldErrors, false);
            if (equalTo != null) {

                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(65).error);
                } else {
                    int equalCheck = Common.isValidDate(equalTo);
                    if (equalCheck == -1) {
                        fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(72).error);
                    } else if (equalCheck == 0) {
                        fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(81).error);
                    }
                }

            }

            Validator.finalErrorCheck(parametersJSON, fieldErrors);
        }
    }

    @
    Override
    public void addToQuery(BoolFilterBuilder bqb, String fieldPrefix, String fieldName, Condition condition) {
        if (minDate != null || maxDate != null) {
            RangeFilterBuilder rqb = FilterBuilders.rangeFilter(fieldPrefix + fieldName);
            if (minDate != null) {
                condition.cost += SearchRequestHandler.costPerFilter;
                rqb.from(minDate);
            }
            if (maxDate != null) {
                condition.cost += SearchRequestHandler.costPerFilter;
                rqb.to(maxDate);
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

        int validCheck = Common.isValidDate(string);
        if (validCheck == -1) {
            throw new ValidatorError(72);
        } else if (validCheck == 0) {
            throw new ValidatorError(81);
        }

        try {
            if (minDate != null) {
                if (string.compareTo(minDate) < 0) {
                    throw new ValidatorError(73, new JSONObject("{'Earliest':" + minDate + "}"));
                }
            }

            if (maxDate != null) {
                if (string.compareTo(maxDate) > 0) {
                    throw new ValidatorError(74, new JSONObject("{'Latest':" + maxDate + "}"));
                }
            }
        } catch (JSONException je) {
            ServerDaemon.error(je);
        }

    };

}