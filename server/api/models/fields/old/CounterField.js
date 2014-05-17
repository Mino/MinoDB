public class CounterField extends ValueField {

    public Long maxNum = null;
    public Long minNum = null;
    public Long equalTo = null;
    public Long setTo = null;

    public CounterField(JSONObject parametersJSON, boolean forSearch) throws ValidatorError {
        super(parametersJSON, forSearch);

        ValidatorObject fieldErrors = new ValidatorObject();

        if (parametersJSON != null) {

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

    public Object checkSingleFieldinFieldMap(SaveObject fo, JSONObject savingFields, JSONObject fields, ValidatorInterface vi) {

        Object obj = fields.get(this.name);
        if (obj != null && obj instanceof JSONObject) {
            JSONObject json = Validator.fieldObject(this.name, fields, vi, this.required);
            try {
                checkValidity(json);
            } catch (ValidatorError e) {
                vi.getOrMakeInvalid().put(this.name, e.error);
            }
        } else {
            fields.remove(this.name);
        }

        fo.addCounterObject(new CounterObject(fo, this, savingFields, setTo));
        if (setTo != null) {
            return setTo;
        }
        return "0";
    }

    public Object parseIfPossible(Object value) {
        return value;
    }

    public void checkValidity(Object value) throws ValidatorError {
        if (value instanceof JSONObject) {
            JSONObject json = (JSONObject) value;
            try {
                Long setValue = json.getLong("Set");
                setTo = setValue;
                if (setTo < 0) {
                    throw new ValidatorError(115);
                }
            } catch (JSONException e) {
                ServerDaemon.error(e);
            }
        }
    }

}