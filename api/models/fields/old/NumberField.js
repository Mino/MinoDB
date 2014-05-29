public class NumberField extends ValueField {

    public Long maxNum = null;
    public Long minNum = null;
    public Long equalTo = null;
    public Boolean integersOnly = null;

    public NumberField(JSONObject parametersJSON, boolean forSearch) throws ValidatorError {
        super(parametersJSON, forSearch);

        ValidatorObject fieldErrors = new ValidatorObject();

        if (parametersJSON != null) {

            integersOnly = Validator.fieldBoolean("Integer", parametersJSON, fieldErrors, false);
            if (integersOnly != null) {
                if (forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Integer", new ValidatorError(57).error);
                }
            }

            minNum = Validator.fieldLong("Minimum", parametersJSON, fieldErrors, false);
            if (minNum != null) {}

            maxNum = Validator.fieldLong("Maximum", parametersJSON, fieldErrors, false);
            if (maxNum != null) {}

            equalTo = Validator.fieldLong("Equal To", parametersJSON, fieldErrors, false);
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
        if (minNum != null || maxNum != null) {
            NumericRangeFilterBuilder rqb = FilterBuilders.numericRangeFilter(fieldPrefix + fieldName);
            if (minNum != null) {
                condition.cost += SearchRequestHandler.costPerFilter;
                rqb.from(minNum);
            }
            if (maxNum != null) {
                condition.cost += SearchRequestHandler.costPerFilter;
                rqb.to(maxNum);
            }
            bqb.must(rqb);
        }
        if (equalTo != null) {
            condition.cost += SearchRequestHandler.costPerFilter;
            bqb.must(FilterBuilders.termFilter(fieldPrefix + fieldName, equalTo));
        }
    }

    public void addToElasticMap(HashMap < String, Object > elasticFieldsMap) {
        HashMap < String, Object > last = new HashMap < String, Object > ();
        last.put("type", "double");
        elasticFieldsMap.put(this.name, last);
    }


    public Object parseIfPossible(Object value) {

        if (value instanceof Integer) {
            Integer intVal = (Integer) value;
            return intVal.doubleValue();
        } else if (value instanceof Float) {
            Float fltVal = (Float) value;
            return fltVal.doubleValue();
        } else if (value instanceof String) {
            if (((String) value).length() == 0) {
                return null;
            }
            try {
                return Double.parseDouble((String) value);
            } catch (Exception ex) {
                return value;
            }
        }
        return value;
    }


    public void checkValidity(Object value) throws ValidatorError {

        if (!(value instanceof Double)) {
            JSONObject expectedError = new JSONObject();
            expectedError.put("Expected", "Number");
            throw new ValidatorError(2, expectedError);
        }

        Double val = (Double) value;

        if (val.isInfinite() || val.isNaN()) {
            throw new ValidatorError(144);
        }

        if (integersOnly != null && integersOnly) {
            if (val.intValue() != val.doubleValue()) {
                throw new ValidatorError(29);
            }
        }

        try {
            if (minNum != null && val.doubleValue() < minNum) {
                throw new ValidatorError(27, new JSONObject("{'Minimum':" + minNum + "}"));
            }

            if (maxNum != null && val.doubleValue() > maxNum) {
                throw new ValidatorError(28, new JSONObject("{'Maximum':" + maxNum + "}"));
            }
        } catch (JSONException je) {
            ServerDaemon.error(je);
        }

    }

}