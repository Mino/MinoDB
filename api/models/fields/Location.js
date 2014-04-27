public class Location {

    public Double latitude = null;
    public Double longitude = null;

    Double maximumKilometersFromLocation;
    Double minimumKilometersFromLocation;

    public Location(JSONObject locObj, boolean distanceFrom) throws ValidatorError {

        ValidatorObject validator = new ValidatorObject();


        if (distanceFrom) {
            this.minimumKilometersFromLocation = Validator.fieldNumber("Minimum Distance", locObj, validator, false);
            if (this.minimumKilometersFromLocation != null) {
                if (this.minimumKilometersFromLocation < 0) {
                    validator.getOrMakeInvalid().put("Minimum Distance", new ValidatorError(134).error);
                }
            }

            this.maximumKilometersFromLocation = Validator.fieldNumber("Maximum Distance", locObj, validator, true);
            if (this.maximumKilometersFromLocation != null) {
                if (this.maximumKilometersFromLocation < 0) {
                    validator.getOrMakeInvalid().put("Maximum Distance", new ValidatorError(134).error);
                }
            }
        } else {
            //Just to make sure it is a recognized field
            Validator.fieldString("Address", locObj, validator, false);
        }

        JSONObject location = Validator.fieldObject("Location", locObj, validator, true);
        if (location != null) {
            ValidatorObject locVal = new ValidatorObject();

            this.latitude = Validator.fieldNumber("lat", location, locVal, true);
            if (this.latitude != null) {
                if (this.latitude > 90.0 || this.latitude < -90.0) {
                    locVal.getOrMakeInvalid().put("lat", new ValidatorError(133).error);
                }
            }

            this.longitude = Validator.fieldNumber("lon", location, locVal, true);
            if (this.longitude != null) {
                if (this.longitude > 180.0 || this.longitude < -180.0) {
                    locVal.getOrMakeInvalid().put("lon", new ValidatorError(134).error);
                }
            }

            try {
                Validator.finalErrorCheck(location, locVal);
            } catch (ValidatorError fe) {
                validator.getOrMakeInvalid().put("Location", fe.error);
            }

        }

        Validator.finalErrorCheck(locObj, validator);

    }

}