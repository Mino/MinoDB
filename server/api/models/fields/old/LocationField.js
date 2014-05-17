public class LocationField extends ValueField {

    Location topLeftBoundingBox = null;
    Location bottomRightBoundingBox = null;
    Location equalTo = null;

    Location distanceFromLocation = null;
    Double minimumKilometersFromLocation = null;
    Double maximumKilometersFromLocation = null;

    public LocationField(JSONObject parametersJSON, boolean forSearch) throws ValidatorError {
        super(parametersJSON, forSearch);

        ValidatorObject fieldErrors = new ValidatorObject();

        if (parametersJSON != null) {

            JSONObject equalToJSON = Validator.fieldObject("Equal To", parametersJSON, fieldErrors, false);
            if (equalToJSON != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Equal To", new ValidatorError(65).error);
                } else {
                    try {
                        equalTo = new Location(equalToJSON, false);
                    } catch (ValidatorError fe) {
                        fieldErrors.getOrMakeInvalid().put("Equal To", fe.error);
                    }
                }
            }

            JSONObject boundingBox = Validator.fieldObject("Bounding Box", parametersJSON, fieldErrors, false);
            if (boundingBox != null) {
                ValidatorObject boundVal = new ValidatorObject();

                JSONObject topLeft = Validator.fieldObject("Top Left", boundingBox, boundVal, true);
                try {
                    topLeftBoundingBox = new Location(topLeft, false);
                } catch (ValidatorError fe) {
                    boundVal.getOrMakeInvalid().put("Top Left", fe.error);
                }

                JSONObject bottomRight = Validator.fieldObject("Bottom Right", boundingBox, boundVal, true);
                try {
                    bottomRightBoundingBox = new Location(bottomRight, false);
                } catch (ValidatorError fe) {
                    boundVal.getOrMakeInvalid().put("Bottom Right", fe.error);
                }

                try {
                    Validator.finalErrorCheck(boundingBox, boundVal);
                } catch (ValidatorError fe) {
                    fieldErrors.getOrMakeInvalid().put("Bounding Box", fe.error);
                }
            }

            JSONObject distanceFrom = Validator.fieldObject("Distance From", parametersJSON, fieldErrors, false);
            if (distanceFrom != null) {
                if (!forSearch) {
                    fieldErrors.getOrMakeInvalid().put("Distance From", new ValidatorError(65).error);
                } else {
                    try {
                        this.distanceFromLocation = new Location(distanceFrom, true);
                        this.minimumKilometersFromLocation = this.distanceFromLocation.minimumKilometersFromLocation;
                        this.maximumKilometersFromLocation = this.distanceFromLocation.maximumKilometersFromLocation;
                    } catch (ValidatorError fe) {
                        fieldErrors.getOrMakeInvalid().put("Distance From", fe.error);
                    }
                }
            }

            Validator.finalErrorCheck(parametersJSON, fieldErrors);
        }
    }


    @
    Override
    public void addToQuery(BoolFilterBuilder bqb, String fieldPrefix, String fieldName, Condition condition) {
        if (this.topLeftBoundingBox != null) {
            GeoBoundingBoxFilterBuilder gbbf = FilterBuilders.geoBoundingBoxFilter(fieldPrefix + fieldName);
            gbbf.topLeft(this.topLeftBoundingBox.latitude, this.topLeftBoundingBox.latitude);
            gbbf.bottomRight(this.bottomRightBoundingBox.latitude, this.bottomRightBoundingBox.longitude);
            bqb.must(gbbf);
            condition.cost += SearchRequestHandler.costPerFilter;
        }
        if (this.distanceFromLocation != null) {
            if (this.minimumKilometersFromLocation != null || this.maximumKilometersFromLocation != null) {
                GeoDistanceRangeFilterBuilder gdrfb = FilterBuilders.geoDistanceRangeFilter(fieldPrefix + fieldName + ".Location");
                gdrfb.lat(this.distanceFromLocation.latitude);
                gdrfb.lon(this.distanceFromLocation.longitude);
                if (this.minimumKilometersFromLocation != null) {
                    gdrfb.gte(this.minimumKilometersFromLocation + "km");
                }
                if (this.maximumKilometersFromLocation != null) {
                    gdrfb.lte(this.maximumKilometersFromLocation + "km");
                }
                bqb.must(gdrfb);
                condition.cost += SearchRequestHandler.costPerFilter;
            }
        }
        if (equalTo != null) {
            condition.cost += SearchRequestHandler.costPerFilter;
            bqb.must(FilterBuilders.termFilter(fieldPrefix + fieldName + ".lat", equalTo.latitude));
            bqb.must(FilterBuilders.termFilter(fieldPrefix + fieldName + ".lon", equalTo.longitude));
        }
    }

    public void addToElasticMap(HashMap < String, Object > elasticFieldsMap) {
        try {

            HashMap < String, Object > fieldDetails = new HashMap < String, Object > ();

            TextField tf = new TextField(null, false);
            tf.name = "Address"; {
                HashMap < String, Object > properties = new HashMap < String, Object > (); {
                    HashMap < String, Object > location = new HashMap < String, Object > ();
                    location.put("type", "geo_point");
                    properties.put("Location", location);
                }
                tf.addToElasticMap(properties);
                fieldDetails.put("properties", properties);
            }

            elasticFieldsMap.put(this.name, fieldDetails);
        } catch (ValidatorError fe) {
            ServerDaemon.error(fe);
        }
    }


    public Object parseIfPossible(Object value) {
        return value;
    }


    public void checkValidity(Object value) throws ValidatorError {

        if (!(value instanceof JSONObject)) {
            JSONObject expectedError = new JSONObject();
            expectedError.put("Expected", "Object");
            throw new ValidatorError(2, expectedError);
        }

        try {
            JSONObject copy = new JSONObject(value.toString());
            new Location(copy, false); //Throws MinoError if invalid
        } catch (JSONException e) {
            ServerDaemon.error(e);
        }

    }

}