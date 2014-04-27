public class TypeComparer {

    public static void processBaseAndRevision(TypeVersion baseType, TypeVersion changedType) throws ValidatorError {

        ValidatorObject fieldsValidator = new ValidatorObject();

        ArrayList < ValueField > newFields = new ArrayList < ValueField > ();

        //Add the fields that weren't present in the revision
        for (ValueField baseField: baseType.fieldList) {
            System.out.println("baseField.name: " + baseField.name);
            ValueField changedField = changedType.fieldMap.get(baseField.name);
            if (changedField == null) {
                //This field has been removed
                baseField.setDeprecated(true);
                changedType.fieldList.add(baseField);
                changedType.savingDetailedFields.put(baseField.detailedjson);
                changedType.savingFields.put(baseField.json);
                changedType.elasticFieldsMap.put(baseField.name, baseField);
            }
        }

        int changedIndex = 0;
        for (ValueField changedField: changedType.fieldList) {
            ValueField baseField = baseType.fieldMap.get(changedField.name);
            if (baseField != null) {
                ValidatorObject thisFieldValidator = new ValidatorObject();
                if (!baseField.fieldTypeName.equals(changedField.fieldTypeName)) {
                    //The two fields have different types
                    JSONObject fieldData = new JSONObject();
                    fieldData.put("Existing Field Type", baseField.fieldTypeName);
                    thisFieldValidator.getOrMakeInvalid().put("Field Type", new ValidatorError(181, fieldData).error);
                }
                System.out.println("b: " + baseField.isArray);
                System.out.println("c: " + changedField.isArray);
                if (baseField.isArray != changedField.isArray) {
                    //The two fields have different array values
                    JSONObject fieldData = new JSONObject();
                    fieldData.put("Existing Array Value", baseField.isArray);
                    thisFieldValidator.getOrMakeInvalid().put("Array", new ValidatorError(182, fieldData).error);
                }
                try {
                    Validator.finalErrorCheck(null, thisFieldValidator);
                } catch (ValidatorError ve) {
                    fieldsValidator.getOrMakeInvalid().put("" + changedIndex, ve.error);
                }
            } else {
                newFields.add(changedField);
            }
            changedIndex++;
        }


        //Throws ValidatorError if any errors occurred
        Validator.finalErrorCheck(null, fieldsValidator);

    }

}