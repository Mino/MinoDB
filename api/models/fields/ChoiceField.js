public class ChoiceField extends ValueField {

    public JSONArray choices = null;
    public String[] choiceArray = null;
    public Integer equalTo = null;

    public ChoiceField(JSONObject parametersJSON, boolean forSearch) throws ValidatorError {
        super(parametersJSON, forSearch);

        ValidatorObject fieldErrors = new ValidatorObject();

        if (parametersJSON != null) {

            choices = Validator.fieldArray("Choices", parametersJSON, fieldErrors, false);
            if (choices != null) {
                if (forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Choices", new ValidatorError(57).error);
                } else {

                    if (choices.length() == 0) {
                        fieldErrors.getOrMakeInvalid().put("Choices", new ValidatorError(160).error);
                    } else {

                        ValidatorObject choiceVO = new ValidatorObject();

                        int index = 0;

                        choiceArray = new String[choices.length()];

                        ListIterator < Object > iterator = choices.listIterator();
                        while (iterator.hasNext()) {
                            Object obj = iterator.next();
                            if (obj instanceof String) {
                                if (((String) obj).length() == 0) {
                                    choiceVO.getOrMakeInvalid().put(
                                        "" + index,
                                        new ValidatorError(3)
                                    );
                                } else {
                                    choiceArray[index] = (String) obj;
                                }
                            } else {
                                choiceVO.getOrMakeInvalid().put(
                                    "" + index,
                                    new ValidatorError(
                                        2,
                                        Validator.createExpectedErrorData("String")
                                    ).error
                                );
                            }
                            index++;
                        }

                        try {
                            Validator.finalErrorCheck(null, choiceVO);
                        } catch (ValidatorError ve) {
                            fieldErrors.getOrMakeInvalid().put("Choices", ve.error);
                        }
                    }
                }
            }

            equalTo = Validator.fieldInteger("Equal To", parametersJSON, fieldErrors, false);
            if (equalTo != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(65).error);
                } else {
                    if (equalTo < 0) {
                        fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(78).error);
                    }
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

    @
    Override
    public void addToElasticMap(HashMap < String, Object > elasticFieldsMap) {
        HashMap < String, Object > last = new HashMap < String, Object > ();
        last.put("type", "integer");
        elasticFieldsMap.put(this.name, last);
    }

    public Object parseIfPossible(Object value) {
        if (value instanceof String) {
            try {
                return Integer.parseInt((String) value);
            } catch (NumberFormatException nfe) {
                return value;
            }
        } else {
            return value;
        }
    }

    @
    Override
    public void checkValidity(Object value) throws ValidatorError {

        if (value instanceof Integer) {
            Integer indexNum = (Integer) value;
            if (indexNum < 0 || indexNum >= choiceArray.length) {
                throw new ValidatorError(78);
            }
        } else {
            JSONObject expectedError = new JSONObject();
            expectedError.put("Expected", "Integer");
            throw new ValidatorError(2, expectedError);
        }

    }

}