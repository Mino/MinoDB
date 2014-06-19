String.prototype.replaceAll = function(re, replace) {
    return this.replace(new RegExp(re, "g"), replace);
}

 var Common = {
    SECONDSDATEFORMAT : "yyyy-MM-dd HH:mm:ss",
    MINUTESDATEFORMAT : "yyyy-MM-dd HH:mm",
    HOURSDATEFORMAT : "yyyy-MM-ddHH",
    DAYDATEFORMAT : "yyyy-MM-dd",
    secondsInOneDay : 60 * 60 * 24,
    MINIMUM_USERNAME_LENGTH : 3,
    MAXIMUM_USERNAME_LENGTH : 15,
    minimumTypeMiddleName : 3,
    maximumTypeMiddleName : 20,
    minimumShortTypeMiddleName : 3,
    maximumShortTypeMiddleName : 20
}




var isValidEmailAddress = function(emailAddress) {
    return EmailValidator.getInstance().isValid(emailAddress);
}

Common.hasPrefix = function(test, prefix) {
    if (test.length >= prefix.length) {
        if (test.substring(0, prefix.length).equals(prefix)) {
            return true;
        }
    }
    return false;
}

Common.isValidPassword = function(pass) {
    if (pass.length < 8) {
        return false;
    }
    if (pass.length > 32) {
        return false;
    }
    return true;
}

//Returns true if the string is valid for use as an object name when saving
Common.isValidSavingObjectName = function(string) {
    if (string.getBytes().length > 100 || string.isEmpty()) {
        return false;
    }
    for (var i = 0; i < string.length; i++) {
        var thisChar = string.charCodeAt(i);
        if (!Common.isValidCharacterForObjectName(thisChar, false)) {
            return false;
        }
    }
    return true;
}

//Returns true if the string is valid for use as an object name when looking up (Not containing invalid characters)
Common.isValidObjectName = function(string) {
    if (string.isEmpty()) {
        return false;
    }
    for (var i = 0; i < string.length; i++) {
        var thisChar = string.charCodeAt(i);
        if (!Common.isValidCharacterForObjectName(thisChar, true)) {
            return false;
        }
    }
    return true;
}


//Returns 1 if the string conforms to the DateTime format (YYYY-MM-DD HH:MM:SS) and is valid e.g. 11th May 1992 at 7:32:48pm is 1992-05-11 19:32:48
//0 for valid format, but invalid date
//-1 for invalid format
Common.isValidDateTime = function(string) {
    if (string.length != 19) {
        return -1;
    }

    if (string.charCodeAt(4) != '-' || string.charCodeAt(7) != '-' || string.charCodeAt(10) != ' ' || string.charCodeAt(13) != ':' || string.charCodeAt(16) != ':') {
        return -1;
    }

    for (var i = 0; i < 10; i++) {
        if (i != 4 && i != 7 && i != 10 && i != 13 && i != 16) {
            var thisChar = string.charCodeAt(i);
            if (thisChar < 48 || thisChar > 57) {
                return -1;
            }
        }
    }

    var year = Integer.parseInt(string.substring(0, 4));
    var month = Integer.parseInt(string.substring(5, 7));
    var day = Integer.parseInt(string.substring(8, 10));
    var hour = Integer.parseInt(string.substring(11, 13));
    var minute = Integer.parseInt(string.substring(14, 16));
    var second = Integer.parseInt(string.substring(17, 19));

    if (month > 12) {
        return 0;
    }

    if (month == 2) {
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
            if (day > 29) {
                return 0;
            }
        } else {
            if (day > 28) {
                return 0;
            }
        }
    }

    if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (day > 30) {
            return 0;
        }
    } else {
        if (day > 31) {
            return 0;
        }
    }

    if (hour > 23) {
        return 0;
    }
    if (minute > 59) {
        return 0;
    }
    if (second > 59) {
        return 0;
    }

    return 1;
}

//Returns 1 if the string conforms to the Date format (YYYY-MM-DD) and is valid e.g. 11th May 1992 is 1992-05-11
//0 for valid format, but invalid date
//-1 for invalid format
Common.isValidDate = function(string) {
    if (string.length != 10) {
        return -1;
    }

    if (string.charCodeAt(4) != '-' || string.charCodeAt(7) != '-') {
        return -1;
    }

    for (var i = 0; i < 10; i++) {
        if (i != 4 && i != 7) {
            var thisChar = string.charCodeAt(i);
            if (thisChar < 48 || thisChar > 57) {
                return -1;
            }
        }
    }

    var year = Integer.parseInt(string.substring(0, 4));
    var month = Integer.parseInt(string.substring(5, 7));
    var day = Integer.parseInt(string.substring(8, 10));

    if (month > 12) {
        return 0;
    }

    if (month == 2) {
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
            if (day > 29) {
                return 0;
            }
        } else {
            if (day > 28) {
                return 0;
            }
        }
    }

    if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (day > 30) {
            return 0;
        }
    } else {
        if (day > 31) {
            return 0;
        }
    }

    return 1;
}

//Returns true if the string is a valid username (Less than 15 characters, more than 1 and not containing the reserved space replacements (ascii 30 or 31), whitespace, dot or /.)
Common.is_valid_username = function(string) {
    var length = string.length;
    if (length > Common.MAXIMUM_USERNAME_LENGTH || length < Common.MINIMUM_USERNAME_LENGTH) {
        return false;
    }

    var letters = /^[a-zA-Z][0-9a-zA-Z]+$/;  
    if(string.match(letters)){
        return true;
    }
    return false;
}

Common.isValidNewUsername = function(string) {
    if (Common.isValidUsername(string)) {
        for (var i = 0; i < string.length; i++) {
            var thisChar = string.charCodeAt(i);
            if (thisChar == '_') {
                return false;
            }
        }
    }
    return false;
}

Common.isValidID = function(string) {
    if (string.length == 0) {
        return false;
    }
    for (var len = 0; len < string.length; len++) {
        var thisChar = string.charCodeAt(len);
        if (thisChar < 48 || thisChar > 57) { //Other than 0 to 9
            return false;
        }
    }
    return true;
}

Common.isTypeVersionAutoGranted = function(name, username) {
    return Common.isValidTypeVersionName(name, username);
}

Common.splitToIDAndVersion = function(toSplit) {
    var split = toSplit.split("/");
    return [
        Long.parseLong(split[0]), Long.parseLong(split[1])
    ];
}

Common.splitToIDAndVersionString = function(toSplit) {
    return toSplit.split("/");
}


Common.convertObjectToIDString = function(value) {

    if (value instanceof Integer) {
        if (value < 1) {
            throw new ValidatorError(38);
        }
        return value.toString();
    } else if (value instanceof Long) {
        if (value < 1) {
            throw new ValidatorError(38);
        }
        return value.toString();
    } else if (value instanceof String) {
        var id = Long.parseLong(value);
        if (id < 1) {
            throw new ValidatorError(38);
        }
        return value;
    }
    throw new ValidatorError(2);
}

Common.convertObjectToVersionLong = function(value) {

    if (value instanceof Integer) {
        if (value < 1) {
            throw new ValidatorError(138);
        }
        return new Long(value);
    } else if (value instanceof Long) {
        if (value < 1) {
            throw new ValidatorError(138);
        }
        return value;
    } else if (value instanceof String) {
        var id = Long.parseLong(value);
        if (id < 1) {
            throw new ValidatorError(138);
        }
        return id;
    }
    throw new ValidatorError(2);
}

Common.convert_path_to_tilde_path = function(path) {
    return path.replaceAll('/', '~');
}

Common.convertTildePathToPath = function(path) {
    return path.replace('~', '/');
}

Common.convertPathToStorePath = function(path) {
    return path.replaceAll('/', String.fromCharCode(30)).replaceAll(' ', String.fromCharCode(31));
}

Common.convertStorePathToPath = function(path) {
    return path.replaceAll(String.fromCharCode(31), ' ').replaceAll(String.fromCharCode(30), '/');
}

Common.getObjectFromID = function(id) {

    // if (idAndVersionAndCreated == null || idAndVersionAndCreated.equals("DELETED")) {
    //     return null;
    // }

    // var idVersionAndCreatedSplit = Common.splitIDValueToVersionAndPathAndCreated(idAndVersionAndCreated);
    // idAndVersion = idVersionAndCreatedSplit[0];
    // if (idAndVersion == null) {
    //     return null;
    // }

    // object = (String) client.get(CouchbasePool.toKVIDVersionKey(idAndVersion));

    // if (object == null) {
    //     return null;
    // }

    // try {
    //     return new JSONObject(objectString);
    // } catch (JSONException e) {
    //     ServerDaemon.error(e);
    // }

    // return null;
}

Common.getObjectFromPath = function(path) {

    // CouchbaseClient client = CouchbasePool.getInstance().getCache();

    // idAndVersion = (String) client.get(CouchbasePool.toKVPathKey(path));

    // if (idAndVersion == null || idAndVersion.equals("DELETED")) {
    //     return null;
    // }

    // object = (String) client.get(CouchbasePool.toKVIDVersionKey(idAndVersion));

    // if (object == null) {
    //     return null;
    // }

    // try {
    //     return new JSONObject(objectString);
    // } catch (JSONException e) {
    //     ServerDaemon.error(e);
    // }

    return null;
}

Common.getMultipleObjectsFromPaths = function(paths) {
    return Common.getMultipleObjectsFromPaths(paths.toArray(new String[paths.size()]));
}


//This method will use the parameter to store intermediate values. Don't pass it something you want to keep.
Common.getMultipleObjectsFromPaths = function(paths) {

    // JSONObject[] returning = new JSONObject[paths.length];

    // GetFuture < Object > [] futures = new GetFuture[paths.length];

    // for (var i = 0; i < paths.length; i++) {
    //     if (paths[i] != null) {
    //         futures[i] = client.asyncGet(CouchbasePool.toKVPathKey(paths[i]));
    //     }
    // }

    // for (var i = 0; i < paths.length; i++) {
    //     try {
    //         if (paths[i] != null) {
    //             paths[i] = (String) futures[i].get();

    //             if (paths[i] == null || paths[i].equals("DELETED")) {
    //                 paths[i] = null;
    //                 futures[i] = null;
    //             } else {
    //                 futures[i] = client.asyncGet(CouchbasePool.toKVIDVersionKey(paths[i]));
    //             }
    //         }
    //     } catch (Exception e) {
    //         paths[i] = null;
    //         futures[i] = null;
    //     }
    // }

    // for (var i = 0; i < paths.length; i++) {
    //     try {
    //         if (futures[i] != null) {
    //             paths[i] = (String) futures[i].get();

    //             if (paths[i].equals("DELETED")) {
    //                 returning[i] = null;
    //             } else {
    //                 returning[i] = new JSONObject(paths[i]);
    //             }
    //         }
    //     } catch (Exception e) {
    //         returning[i] = null;
    //     }
    // }
    return returning;
}

//This method will use the parameter to store intermediate values. Don't pass it something you want to keep.
Common.getMultipleObjectsFromIDs = function(ids) {

    // CouchbaseClient client = CouchbasePool.getInstance().getCache();

    // JSONObject[] returning = new JSONObject[ids.length];

    // GetFuture < Object > [] futures = new GetFuture[ids.length];

    // for (var i = 0; i < ids.length; i++) {
    //     futures[i] = client.asyncGet(CouchbasePool.toKVIDKey(ids[i]));
    // }

    // for (var i = 0; i < ids.length; i++) {
    //     try {
    //         ids[i] = (String) futures[i].get();

    //         if (ids[i] == null || ids[i].equals("DELETED")) {
    //             ids[i] = null;
    //             futures[i] = null;
    //         } else {
    //             var idVersionAndCreatedSplit = Common.splitIDValueToVersionAndPathAndCreated(ids[i]);
    //             idAndVersion = idVersionAndCreatedSplit[0];
    //             if (idAndVersion == null) {
    //                 ids[i] = null;
    //                 futures[i] = null;
    //             } else {
    //                 futures[i] = client.asyncGet(CouchbasePool.toKVIDVersionKey(idAndVersion));
    //             }
    //         }
    //     } catch (Exception e) {
    //         ids[i] = null;
    //         futures[i] = null;
    //     }
    // }

    // for (var i = 0; i < ids.length; i++) {
    //     try {
    //         if (futures[i] != null) {
    //             ids[i] = (String) futures[i].get();

    //             if (ids[i].equals("DELETED")) {
    //                 returning[i] = null;
    //             } else {
    //                 returning[i] = new JSONObject(ids[i]);
    //             }
    //         }
    //     } catch (Exception e) {
    //         returning[i] = null;
    //     }
    // }


    return returning;
}

Common.getDateTimeString = function(format) {
    // final SimpleDateFormat sdf = new SimpleDateFormat(format);
    // sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
    // final utcTime = sdf.format(new Date());
    // return utcTime;
}

Common.buildIDValueFromIDVersionPathAndCreated = function(idVersion, path, created) {
    return idVersion + " " + Common.convertPathToStorePath(path) + " " + created;
}

Common.idFromCounterAddress = function(address) {
    var split = address.split("\\.");

    if (Common.isValidID(split[0]) && Common.isValidTypeVersionName(split[1] + "." + split[2] + "." + split[3]) && Common.isValidFieldName(split[4])) {
        return split[0];
    }

    throw new ValidatorError(112);
}


if (typeof module != 'undefined') {
    module.exports = Common;
}