public class LinkField extends ValueField {

    public Boolean idsAllowed = null;
    public Boolean pathsAllowed = null;
    public Boolean foldersAllowed = null;
    public Boolean itemsAllowed = null;
    public Boolean selfAllowed = null;
    public JSONArray recommendedTypes = null;
    public String childOf = null;
    public String equalTo = null;
    public String caseInsensitiveEqualTo = null;
    public String prefix = null;
    public String caseInsensitivePrefix = null;

    public LinkField(JSONObject parametersJSON, boolean forSearch) throws ValidatorError {
        super(parametersJSON, forSearch);

        ValidatorObject fieldErrors = new ValidatorObject();

        if (parametersJSON != null) {

            idsAllowed = Validator.fieldBoolean("IDs Allowed", parametersJSON, fieldErrors, false);
            if (idsAllowed != null) {
                if (forSearch) {
                    fieldErrors.getOrMakeInvalid().put("IDs Allowed", new ValidatorError(57).error);
                }
            }

            pathsAllowed = Validator.fieldBoolean("Paths Allowed", parametersJSON, fieldErrors, false);
            if (pathsAllowed != null) {
                if (forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Paths Allowed", new ValidatorError(57).error);
                }
            }

            itemsAllowed = Validator.fieldBoolean("Items Allowed", parametersJSON, fieldErrors, false);
            if (itemsAllowed != null) {
                if (forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Items Allowed", new ValidatorError(57).error);
                }
            }

            foldersAllowed = Validator.fieldBoolean("Folders Allowed", parametersJSON, fieldErrors, false);
            if (foldersAllowed != null) {
                if (forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Folders Allowed", new ValidatorError(57).error);
                }
            }

            selfAllowed = Validator.fieldBoolean("Self Allowed", parametersJSON, fieldErrors, false);
            if (selfAllowed != null) {
                if (forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Self Allowed", new ValidatorError(57).error);
                }
            }

            childOf = Validator.fieldString("Child Of", parametersJSON, fieldErrors, false);
            if (childOf != null) {

                try {
                    Path path = new Path(childOf);
                    if (!path.isFolder()) {
                        throw new ValidatorError(178);
                    }
                } catch (ValidatorError fe) {
                    fieldErrors.getOrMakeInvalid().put("Child Of", fe.error);
                }
                if (!forSearch) {
                    if (pathsAllowed == null || pathsAllowed == false) {
                        fieldErrors.getOrMakeInvalid().put("Child Of", new ValidatorError(176).error);
                    }
                }
            }

            caseInsensitiveEqualTo = Validator.fieldString("Case-Insensitive Equal To", parametersJSON, fieldErrors, false);
            if (caseInsensitiveEqualTo != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Case-Insensitive Equal To", new ValidatorError(65).error);
                } else {

                    boolean accepted = true;

                    try {
                        new Path(caseInsensitiveEqualTo, true, true); //Created only to check if the value is a valid path
                    } catch (ValidatorError fe) {
                        accepted = false;
                    }

                    if (!accepted) {
                        Long id = Long.parseLong(caseInsensitiveEqualTo);
                        if (id > 0) {
                            accepted = true;
                        }
                    }

                    if (!accepted) {
                        fieldErrors.getOrMakeInvalid().put("Case-Insensitive Equal To", new ValidatorError(66).error);
                    }

                }
            }

            equalTo = Validator.fieldString("Equal To", parametersJSON, fieldErrors, false);
            if (equalTo != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(65).error);
                } else {

                    boolean accepted = true;

                    try {
                        new Path(equalTo, true, true); //Created only to check if the value is a valid path
                    } catch (ValidatorError fe) {
                        accepted = false;
                    }

                    if (!accepted) {
                        Long id = Long.parseLong(equalTo);
                        if (id > 0) {
                            accepted = true;
                        }
                    }

                    if (!accepted) {
                        fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(66).error);
                    }

                }
            }

            prefix = Validator.fieldString("Prefix", parametersJSON, fieldErrors, false);
            if (prefix != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Prefix", new ValidatorError(65).error);
                }
            }

            caseInsensitivePrefix = Validator.fieldString("Case-Insensitive Prefix", parametersJSON, fieldErrors, false);
            if (caseInsensitivePrefix != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Case-Insensitive Prefix", new ValidatorError(65).error);
                }
            }


            recommendedTypes = Validator.fieldArray("Recommended Types", parametersJSON, fieldErrors, false);
            if (recommendedTypes != null) {
                if (forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Recommended Types", new ValidatorError(57).error);
                } else {
                    ValidatorObject recommendedVal = new ValidatorObject();

                    if (recommendedTypes.length() != 0) {
                        ListIterator < Object > iterator = recommendedTypes.listIterator();
                        while (iterator.hasNext()) {
                            Object thisSplit = iterator.next();
                            if (!(thisSplit instanceof String)) {
                                recommendedVal.getOrMakeInvalid().put("" + iterator.previousIndex(), new ValidatorError(2).error);
                            } else {
                                String reqName = (String) thisSplit;
                                if (!(Common.isValidTypeVersionName(reqName) || Common.isValidTypeName(reqName))) {
                                    recommendedVal.getOrMakeInvalid().put("" + iterator.previousIndex(), new ValidatorError(47).error);
                                }
                            }

                        }
                        try {
                            Validator.finalErrorCheck(null, recommendedVal);
                        } catch (ValidatorError fe) {
                            fieldErrors.getOrMakeInvalid().put("Recommended Types", fe.error);
                        }
                    }
                }
            }
        }

        if (!forSearch && (idsAllowed == null || !(idsAllowed)) && (pathsAllowed == null || !(pathsAllowed))) {
            fieldErrors.getOrMakeInvalid().put("IDs Allowed", new ValidatorError(63).error);
            fieldErrors.getOrMakeInvalid().put("Paths Allowed", new ValidatorError(63).error);
        }

        if (!forSearch && (itemsAllowed == null || !(itemsAllowed)) && (foldersAllowed == null || !(foldersAllowed))) {
            fieldErrors.getOrMakeInvalid().put("Items Allowed", new ValidatorError(127).error);
            fieldErrors.getOrMakeInvalid().put("Folders Allowed", new ValidatorError(127).error);
        }

        Validator.finalErrorCheck(parametersJSON, fieldErrors);
    }



    @
    Override
    public void addToQuery(BoolFilterBuilder bqb, String fieldPrefix, String fieldName, Condition condition) {

        if (childOf != null) {
            condition.cost += SearchRequestHandler.costPerFilter;
            bqb.must(FilterBuilders.prefixFilter(fieldPrefix + fieldName, childOf));
        }

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

        if (selfAllowed != null && selfAllowed) {
            if (string.equals("SELF")) {
                return;
            }
        }

        if (pathsAllowed != null && pathsAllowed) {
            Path path = new Path(string);
            if (path.isFolder()) {
                if (foldersAllowed == null || !(foldersAllowed)) {
                    throw new ValidatorError(66);
                }
            } else {
                if (itemsAllowed == null || !(itemsAllowed)) {
                    throw new ValidatorError(66);
                }
            }
            if (childOf != null) {
                if (!Common.hasPrefix(path.toString(), childOf) &&
                    //Length check to ensure the path isn't equal to the Child Of value
                    path.toString().length() > childOf.length()) {
                    JSONObject childOfJSON = new JSONObject();
                    childOfJSON.put("Child Of", childOf);
                    throw new ValidatorError(175, childOfJSON);
                }
            }
            return;
        }

        if (idsAllowed != null && idsAllowed) {
            try {
                Long id = Long.parseLong(string);
                if (id < 1) {
                    throw new ValidatorError(66);
                }
            } catch (NumberFormatException nfe) {
                throw new ValidatorError(66);
            }
        } else {
            throw new ValidatorError(66);
        }

    }

}