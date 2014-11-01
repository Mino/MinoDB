public class Condition extends ValidatorObject implements TypeVersionListener, ConditionListener {

    public ArrayList < Condition > conditions = new ArrayList < Condition > ();
    public ValidatorObject conditionValidator;

    private HashMap < String, JSONObject > typeVersionContents = new HashMap < String, JSONObject > ();

    /* operatorNumber
     * -1 = Not set
     * 0 = And
     * 1 = Or
     * 2 = Not*/
    private int operatorNumber = -1;
    private JSONObject parameters;
    private int parentIndex;
    private int searchIndex = 0;
    private int waitingForTypes = 0;
    private int waitingForConditions = 0;
    private ConditionListener parent;
    private BoolFilterBuilder searchFilterBuilder = null;
    private boolean hasSearchParameters = false;
    private boolean successfulSearchParameters = false;

    public int cost = 0;

    public Condition(JSONObject parameters, TypeRetriever typeRetriever, ConditionListener parent, int parentIndex, ValidatorInterface searchRequestHandler) {

        if (searchRequestHandler != null) {
            //This is the "base" condition
            //Prevents this new ValidatorInterface from reporting errors due to unrecognized keys in the base search
            this.getRecognized().addAll(searchRequestHandler.getRecognized());
        }

        this.parameters = parameters;

        this.parentIndex = parentIndex;
        this.parent = parent;

        this.searchFilterBuilder = FilterBuilders.boolFilter();

        JSONArray conditionsArray = Validator.fieldArray("Conditions", parameters, this, false);
        String operator = Validator.fieldString("Operator", parameters, this, false);

        String anyField = Validator.fieldString("Any", parameters, this, false);
        if (anyField != null) {
            searchFilterBuilder.must(FilterBuilders.queryFilter(QueryBuilders.queryString(anyField)));
            hasSearchParameters = true;
            successfulSearchParameters = true;
        }

        JSONObject nameField = Validator.fieldObject("Name", parameters, this, false);
        if (nameField != null) {
            try {
                ValueField nameFieldObject = ValueField.instantiateField("Text", nameField, true);
                int preAddition = this.cost;
                nameFieldObject.addToQuery(searchFilterBuilder, "", "Name", this);
                if (preAddition != this.cost) {
                    successfulSearchParameters = true;
                }
            } catch (ValidatorError fe) {
                this.getOrMakeInvalid().put("Name", fe.error);
            }
            hasSearchParameters = true;
        }

        JSONObject createdField = Validator.fieldObject("Created", parameters, this, false);
        if (createdField != null) {
            try {
                ValueField dateTimeField = ValueField.instantiateField("Date & Time", createdField, true);
                int preAddition = this.cost;
                dateTimeField.addToQuery(searchFilterBuilder, "", "Created", this);
                if (preAddition != this.cost) {
                    successfulSearchParameters = true;
                }
            } catch (ValidatorError fe) {
                this.getOrMakeInvalid().put("Created", fe.error);
            }
            hasSearchParameters = true;
        }

        JSONObject versionField = Validator.fieldObject("Version", parameters, this, false);
        if (versionField != null) {
            try {
                ValueField numberField = ValueField.instantiateField("Number", versionField, true);
                int preAddition = this.cost;
                numberField.addToQuery(searchFilterBuilder, "", "Version", this);
                if (preAddition != this.cost) {
                    successfulSearchParameters = true;
                }
            } catch (ValidatorError fe) {
                this.getOrMakeInvalid().put("Version", fe.error);
            }
            hasSearchParameters = true;
        }


        JSONObject lastUpdatedField = Validator.fieldObject("Last Updated", parameters, this, false);
        if (lastUpdatedField != null) {
            try {
                ValueField dateTimeField = ValueField.instantiateField("Date & Time", lastUpdatedField, true);
                int preAddition = this.cost;
                dateTimeField.addToQuery(searchFilterBuilder, "", "Last Updated", this);
                if (preAddition != this.cost) {
                    successfulSearchParameters = true;
                }
            } catch (ValidatorError fe) {
                this.getOrMakeInvalid().put("Last Updated", fe.error);
            }
            hasSearchParameters = true;
        }

        String[] keysToRemove = new String[parameters.length()];

        for (Entry < String, Object > thisPair: parameters.entries()) {
            String key = thisPair.getKey();
            Object value = thisPair.getValue();
            if (Common.isValidTypeVersionName(key)) {
                if (value instanceof JSONObject) {
                    JSONObject thisTypeFields = (JSONObject) value;
                    this.typeVersionContents.put(key, thisTypeFields);
                    typeRetriever.requestTypeVersionNameWithListener(key, this);
                    waitingForTypes++;
                } else if (value instanceof JSONArray && ((JSONArray) value).length() == 0) {
                    JSONObject thisTypeFields = new JSONObject();
                    this.typeVersionContents.put(key, thisTypeFields);
                    typeRetriever.requestTypeVersionNameWithListener(key, this);
                    waitingForTypes++;
                } else {
                    this.getOrMakeInvalid().put(key, new ValidatorError(26).error);
                }
                keysToRemove[searchIndex] = key;
                searchIndex++;
                hasSearchParameters = true;
                successfulSearchParameters = true;
            }
        }


        for (int i = 0; i < searchIndex; i++) {
            parameters.remove(keysToRemove[i]);
        }

        if (hasSearchParameters) {
            if (conditionsArray != null) {
                this.getOrMakeInvalid().put("Conditions", new ValidatorError(157).error);
            } else if (operator != null) {
                this.getOrMakeInvalid().put("Operator", new ValidatorError(157).error);
            }
        } else {
            if (conditionsArray == null && parentIndex != -1) { //Not base
                if (!this.hasInvalidKey("Conditions")) {
                    this.getOrMakeMissing().put("Conditions", new ValidatorError(1).error);
                }
            }

            if (operator != null) {
                if (operator.equals("And")) {
                    operatorNumber = 0;
                } else if (operator.equals("Or")) {
                    operatorNumber = 1;
                } else if (operator.equals("Not")) {
                    operatorNumber = 2;
                } else {
                    this.getOrMakeInvalid().put("Operator", new ValidatorError(158).error);
                }
                if (conditionsArray == null) {
                    this.getOrMakeInvalid().put("Operator", new ValidatorError(173).error);
                }
            }

            if (operatorNumber == -1) {
                //Default to And
                operatorNumber = 0;
            }

            if (conditionsArray != null) {

                conditionValidator = new ValidatorObject();

                ListIterator < Object > iterator = conditionsArray.listIterator();
                int index = -1;
                while (iterator.hasNext()) {
                    Object thisObject = iterator.next();
                    index++;

                    if (!(thisObject instanceof JSONObject)) {
                        conditionValidator.getOrMakeInvalid().put("" + index, new ValidatorError(2).error);
                        waitingForConditions--;
                    } else {
                        Condition childCondition = new Condition((JSONObject) thisObject, typeRetriever, this, index, null);
                        conditions.add(childCondition);
                    }
                }

                /* Add the waiting for conditions afterwards as the 
                 * construction of each condition can create subconditions
                 * that can decrease the count.
                 */
                waitingForConditions += conditionsArray.length();
            }

        }

        if (conditionsArray == null) {
            //In the case of only general (Name, Created) searches
            if (waitingForTypes == 0) {
                typesFinishedProcessing();
            }
        } else {
            if (waitingForConditions == 0) {
                conditionsFinishedProcessing();
            }
        }

    }

    private FilterBuilder createFilter() {
        switch (operatorNumber) {
            case -1:
                if (successfulSearchParameters) {
                    return searchFilterBuilder;
                }
                return null;
            case 0:
                if (conditions.size() > 0) {
                    BoolFilterBuilder bfb = new BoolFilterBuilder();
                    int didAdd = 0;
                    for (Condition c: conditions) {
                        this.cost += c.cost;
                        if (c.addToQuery(bfb, false)) {
                            didAdd++;
                        }
                    }
                    if (didAdd > 0) {
                        return bfb;
                    }
                }
                return null;
            case 1:
                if (conditions.size() > 0) {
                    OrFilterBuilder ofb = new OrFilterBuilder();
                    int didAdd = 0;
                    for (Condition c: conditions) {
                        this.cost += c.cost;
                        if (c.addToQuery(ofb)) {
                            didAdd++;
                        }
                    }
                    if (didAdd > 0) {
                        return ofb;
                    }
                }
                return null;
            case 2:
                if (conditions.size() > 0) {
                    BoolFilterBuilder bfb = new BoolFilterBuilder();
                    int didAdd = 0;
                    for (Condition c: conditions) {
                        this.cost += c.cost;
                        if (c.addToQuery(bfb, true)) {
                            didAdd++;
                        }
                    }
                    if (didAdd > 0) {
                        return bfb;
                    }
                }
                return null;
        }
        return null;
    }

    public boolean addToQuery(OrFilterBuilder fb) {
        FilterBuilder createdFilter = this.createFilter();
        if (createdFilter != null) {
            fb.add(createdFilter);
            return true;
        }
        return false;
    }

    public boolean addToQuery(BoolFilterBuilder fb, boolean isNot) {
        FilterBuilder createdFilter = this.createFilter();
        if (createdFilter != null) {
            if (isNot) {
                fb.mustNot(createdFilter);
            } else {
                fb.must(createdFilter);
            }
            return true;
        }
        return false;
    }

    @
    Override
    public void typeVersionAvailable(TypeVersion thisTV) {
        waitingForTypes--;

        this.cost += SearchRequestHandler.costPerType;

        JSONObject fieldsToCheck = this.typeVersionContents.get(thisTV.fullVersionName);

        boolean requireExistCheck = true;

        for (Entry < String, Object > pair: fieldsToCheck.entries()) {
            String key = pair.getKey();
            this.cost += SearchRequestHandler.costPerField;
            ValueField fieldFromTV = thisTV.fieldMap.get(pair.getKey());

            try {
                if (fieldFromTV == null) {
                    throw new ValidatorError(62);
                }

                if (!(pair.getValue() instanceof JSONObject)) {
                    throw new ValidatorError(17);
                } else {
                    ValueField searchField = ValueField.instantiateField(fieldFromTV.fieldTypeName, (JSONObject) pair.getValue(), true);
                    int preAddition = this.cost;
                    searchField.addToQuery(searchFilterBuilder, thisTV.fullVersionName + ".", key, this);
                    if (preAddition != this.cost) {
                        /* Must use exist check because it's possible to 
                         * use a query such as -lorem -ipsum, that doesn't
                         * do anything.
                         */
                        //requireExistCheck = false;
                    }
                    searchField.doExistanceCheck(searchFilterBuilder, thisTV.fullVersionName + ".", key, this);
                }
            } catch (ValidatorError fe) {

                JSONObject invalid = this.getOrMakeInvalid();
                JSONObject existingInvalid = null;

                /*Try to get the Type->Invalid JSONObject and if this fails it 
                 *shows that the type and its invalid index need to be added. */
                try {
                    JSONObject existingType = invalid.getJSONObject(thisTV.fullVersionName);
                    if (existingType != null) {
                        existingInvalid = existingType.getJSONObject("Invalid");
                    }
                    if (existingInvalid == null) {
                        JSONObject dataObj = new JSONObject();
                        existingInvalid = new JSONObject();
                        dataObj.put("Invalid", existingInvalid);
                        JSONObject newError = new ValidatorError(0, dataObj).error;
                        invalid.put(thisTV.fullVersionName, newError);
                    }
                    existingInvalid.put(key, fe.error);
                } catch (JSONException je) {
                    this.getOrMakeInvalid().put("Search Error", true);
                    ServerDaemon.error(je);
                }
            }
        }

        if (requireExistCheck) {
            searchFilterBuilder.must(FilterBuilders.queryFilter(QueryBuilders.termQuery("Types", thisTV.fullVersionName)));
        }

        if (waitingForTypes == 0) {
            typesFinishedProcessing();
        }
    }

    @
    Override
    public void typeVersionNotAvailable(TypeVersion thisTV) {
        waitingForTypes--;
        this.getOrMakeInvalid().put(thisTV.fullVersionName, new ValidatorError(15).error);
        if (waitingForTypes <= 0) {
            typesFinishedProcessing();
        }
    }

    public void subConditionHasError(int index, ValidatorError fe) {

        waitingForConditions--;

        conditionValidator.getOrMakeInvalid().put("" + index, fe.error);

        if (waitingForConditions == 0) {
            this.conditionsFinishedProcessing();
        }
    }

    public void subConditionCompleted(int index) {

        waitingForConditions--;

        if (waitingForConditions == 0) {
            this.conditionsFinishedProcessing();
        }
    }

    public void conditionsFinishedProcessing() {
        if (conditionValidator != null) {
            /* It's possible that conditions aren't being validated
             * if there was an error.
             */
            try {
                Validator.finalErrorCheck(null, conditionValidator);
            } catch (ValidatorError fe) {
                this.getOrMakeInvalid().put("Conditions", fe.error);
            }
        }
        try {
            Validator.finalErrorCheck(null, this);
            this.parent.subConditionCompleted(parentIndex);
        } catch (ValidatorError fe2) {
            this.parent.subConditionHasError(parentIndex, fe2);
        }
    }

    public void typesFinishedProcessing() {

        try {
            Validator.finalErrorCheck(this.parameters, this);
            //Can throw and therefore miss the next line

            this.parent.subConditionCompleted(parentIndex);
        } catch (ValidatorError fe) {
            this.parent.subConditionHasError(parentIndex, fe);
        }
    }

}