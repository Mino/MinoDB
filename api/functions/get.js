var Validator = require('../../../FieldVal/fieldval-js/lib/fieldval');
var Path = require('../Models/Path')
var logger = require('tracer').console();

module.exports = function(user, parameters, callback) {

    var validator = new Validator(parameters);
    var addresses = validator.get("addresses", "array", true);

    var val_error = validator.end();
    if (val_error != null) {
        callback(val_error);
        return;
    }

    var ids = [];
    var id_versions = [];
    var paths = [];
    var types = [];

    //Used to retrieve pointers (e.g. paths / ids - not id versions)
    var get_pointer_array = [];

    //Used to retrieve final objects
    var get_final_array = [];

    //Used to hold the objects ready to send in response
    var response_array = [];

    //Retains references to objects that will be returned, so they can be 
    //removed if the privileges aren't found
    var awaiting_privileges = [];

    // logger.log(val_error);
    // callback(val_error);
    // return;

    for (var i = 0; i < addresses.length; i++) {
        var this_address = addresses[i];

        logger.log("TESTING: " + this_address);

        var type_of = typeof this_address;

        var to_add_to_final;

        if (type_of == 'string') {

            var index_of_slash = this_address.indexOf('/');

            if (index_of_slash == -1) {
                //Could be a number or Type
                var numeric_value = +this_address;
                var is_integer = numeric_value % 1 == 0;
                if (isNaN(numeric_value) || !is_integer || numeric_value < 0) {
                    logger.log("Type?");
                } else {
                    ids.push([numeric_value, i]);
                }
            } else if (index_of_slash == 0) {
                //First char is slash - must be path
                logger.log("path");

                var path = new Path();
                var path_error = path.init(this_address);
                if (path_error != null) {
                    to_add_to_final = path_error;
                } else {
                    //Valid path
                    to_add_to_final = null;
                    paths.push([path, i]);
                }
            } else {
                //Could be id/version
                var split_1 = this_address.substring(0, index_of_slash);
                var num_1 = +split_1;
                var is_integer_1 = num_1 % 1 == 0;
                var split_2 = this_address.substring(index_of_slash + 1);
                var num_2 = +split_2;
                var is_integer_2 = num_2 % 1 == 0;

                if (isNaN(num_1) || !is_integer_1 || num_1 < 1 || isNaN(num_2) || !is_integer_2 || num_2 < 1) {
                    to_add_to_final = Validator.Error(0);
                } else {
                    logger.log([num_1, num_2, i]);
                    id_versions.push([num_1, num_2, i]);
                }
            }
        } else if (type_of == 'number') {

            var is_integer = this_address % 1 === 0;
            if (is_integer && this_address > 0) {
                ids.push([this_address, i]);
            } else {
                to_add_to_final = Validator.Error(0);
            }

        } else {
            to_add_to_final = Validator.Error(0);
        }

        logger.log(get_pointer_array);
        logger.log(get_final_array);

        response_array.push(to_add_to_final);
    }

    for (var i = 0; i < paths.length; i++) {
        var path_object = paths[i];
        var response_index = path_object[1];
        response_array[response_index] = {
            "ADDED": true
        };
    }

    callback(null, {
        "objects": response_array
    })

}


//     if (addressArray != null) {
//         ListIterator < Object > iterator = addressArray.listIterator();
//         while (iterator.hasNext()) {
//             Object thisAddress = iterator.next();

//             if (thisAddress instanceof Integer) {
//                 thisAddress = thisAddress.toString();
//             }

//             if (thisAddress instanceof Long) {
//                 thisAddress = thisAddress.toString();
//             }

//             if (thisAddress instanceof Double) {
//                 thisAddress = ((Long)(((Double) thisAddress).longValue())).toString();
//             }

//             if (thisAddress instanceof String) {

//                 if (((String) thisAddress).isEmpty()) {
//                     iterator.set(new ValidatorError(11).error);
//                 } else {

//                     int firstChar = (int)((String) thisAddress).charAt(0);
//                     if (firstChar == 47) { //'/' Path

//                         try {
//                             Path addressPath = new Path((String) thisAddress);

//                             RawJSON thisJObj = new RawJSON(null);
//                             Triple < String, Path, RawJSON > thisTriple = new Triple < String, Path, RawJSON > (addressPath.toString(), addressPath, thisJObj);
//                             iterator.set(thisJObj);
//                             paths.add(thisTriple);
//                             this.getPointerArray.add(CouchbasePool.toKVPathKey(addressPath.toString()));

//                         } catch (ValidatorError fe) {
//                             iterator.set(fe.error);
//                         }
//                     } else if (firstChar > 48 && firstChar < 58) { //1 to 9

//                         boolean didFindError = false;

//                         if (((String) thisAddress).indexOf('/') > 0) {

//                             String[] thisSplit = ((String) thisAddress).split("/");
//                             try {
//                                 Long id = Long.parseLong(thisSplit[0]);
//                                 Long version = Long.parseLong(thisSplit[1]);
//                                 if (id < 1 || version < 1) {
//                                     ValidatorError err = new ValidatorError(37);
//                                     iterator.set(err.error);
//                                     didFindError = true;
//                                 }
//                             } catch (NumberFormatException nfe) {
//                                 ValidatorError err = new ValidatorError(37);
//                                 iterator.set(err.error);
//                                 didFindError = true;
//                             }

//                             if (!didFindError) {
//                                 RawJSON thisJObj = new RawJSON(null);
//                                 Pair < String, RawJSON > thisPair = new Pair < String, RawJSON > ((String) thisAddress, thisJObj);
//                                 iterator.set(thisJObj);
//                                 this.idVersions.add(thisPair);
//                                 this.getFinalArray.add(CouchbasePool.toKVIDVersionKey((String) thisAddress));
//                             }

//                         } else {
//                             try {
//                                 Long id = Long.parseLong((String) thisAddress);
//                                 if (id < 1) {
//                                     ValidatorError err = new ValidatorError(38);
//                                     iterator.set(err.error);
//                                     didFindError = true;
//                                 }
//                             } catch (NumberFormatException nfe) {
//                                 ValidatorError err = new ValidatorError(38);
//                                 iterator.set(err.error);
//                                 didFindError = true;
//                             }

//                             if (!didFindError) {
//                                 RawJSON thisJObj = new RawJSON(null);
//                                 Pair < String, RawJSON > thisPair = new Pair < String, RawJSON > ((String) thisAddress, thisJObj);
//                                 iterator.set(thisJObj);
//                                 this.ids.add(thisPair);
//                                 this.getPointerArray.add(CouchbasePool.toKVIDKey((String) thisAddress));
//                             }

//                         }




//                     } else { //Must be a type name
//                         if (Common.isValidTypeVersionName((String) thisAddress)) {
//                             RawJSON thisJObj = new RawJSON(null);
//                             Pair < String, RawJSON > thisPair = new Pair < String, RawJSON > ((String) thisAddress, thisJObj);
//                             iterator.set(thisJObj);
//                             types.add(thisPair);

//                             String[] splitTypeVersion = ((String) thisAddress).split("\\.");

//                             if (!splitTypeVersion[0].equals(this.user.username)) {
//                                 this.getFinalArray.add(CouchbasePool.toKVPathKey("/" + this.user.username + "/Type Privileges/Received/" + splitTypeVersion[0] + "/" + (String) thisAddress));
//                                 this.getFinalArray.add(CouchbasePool.toKVPathKey("/Public/Type Privileges/Received/" + splitTypeVersion[0] + "/" + (String) thisAddress));
//                             }

//                             this.getFinalArray.add(CouchbasePool.toKVDetailedTypeVersionKey((String) thisAddress));
//                         } else {
//                             iterator.set(new ValidatorError(11).error);
//                         }
//                     }
//                 }
//             } else {
//                 ValidatorError err = new ValidatorError(11);
//                 iterator.set(err.error);
//             }
//         }
//     }

//     Validator.finalErrorCheck(this.parameters, this);


//     Map < String, Object > pointerResult = CouchbasePool.getInstance().getCache().getBulk(this.getPointerArray);

//     for (Triple < String, Path, RawJSON > triple: this.paths) {
//         String mem = (String) pointerResult.get(CouchbasePool.toKVPathKey(triple.left));
//         Path path = triple.middle;
//         triple.left = mem; //will be null if not found (should be ignored from now on)
//         if (mem == null) {
//             triple.right.cloneJSONObject(new ValidatorError(14).error);
//         } else {
//             this.getFinalArray.add(CouchbasePool.toKVIDVersionKey(mem));
//             this.objectPrivilegeRetriever.addPathForObject(path, triple.right);
//             this.awaitingPrivileges.put(triple.right, false);
//         }
//     }
//     for (Pair < String, RawJSON > pair: this.ids) {
//         String mem = (String) pointerResult.get(CouchbasePool.toKVIDKey(pair.left));
//         if (mem == null || mem.equals("DELETED")) {
//             pair.right.cloneJSONObject(new ValidatorError(14).error);
//             pair.left = mem; //will be null if not found (should be ignored from now on)
//         } else {
//             String[] versionAndCreated = Common.splitIDValueToVersionAndPathAndCreated(mem);
//             String idVersion = versionAndCreated[0];
//             if (idVersion == null) {

//                 pair.right.cloneJSONObject(new ValidatorError(14).error);
//                 pair.left = mem; //will be null if not found (should be ignored from now on)
//             } else {
//                 Path path = new Path(versionAndCreated[1]);
//                 pair.left = idVersion;
//                 this.getFinalArray.add(CouchbasePool.toKVIDVersionKey(idVersion));
//                 this.objectPrivilegeRetriever.addPathForObject(path, pair.right);
//                 this.awaitingPrivileges.put(pair.right, false);
//             }
//         }
//     }

//     Map < String, Object > finalResult = CouchbasePool.getInstance().getCache().getBulk(this.getFinalArray);


//     for (Triple < String, Path, RawJSON > triple: this.paths) {
//         if (triple.left != null) {
//             String mem = (String) finalResult.get(CouchbasePool.toKVIDVersionKey(triple.left));
//             if (mem == null) {
//                 triple.right.cloneJSONObject(new ValidatorError(14).error);
//             } else {
//                 triple.right.setString(mem);
//             }
//         }
//     }
//     for (Pair < String, RawJSON > pair: this.ids) {
//         if (pair.left != null) {
//             String mem = (String) finalResult.get(CouchbasePool.toKVIDVersionKey(pair.left));
//             if (mem == null) {
//                 pair.right.cloneJSONObject(new ValidatorError(14).error);
//             } else {
//                 pair.right.setString(mem);
//             }
//         }
//     }



//     for (Pair < String, RawJSON > pair: this.types) {
//         if (pair.left != null) {
//             String mem = (String) finalResult.get(CouchbasePool.toKVDetailedTypeVersionKey(pair.left));
//             if (mem == null) {
//                 pair.right.cloneJSONObject(new ValidatorError(15).error);
//             } else {

//                 String[] splitTypeVersion = pair.left.split("\\.");

//                 if (!splitTypeVersion[0].equals(this.user.username)) {

//                     if (
//                         finalResult.get(CouchbasePool.toKVPathKey("/" + this.user.username + "/Type Privileges/Received/" + splitTypeVersion[0] + "/" + pair.left)) != null ||
//                         finalResult.get(CouchbasePool.toKVPathKey("/Public/Type Privileges/Received/" + splitTypeVersion[0] + "/" + pair.left)) != null
//                     ) {
//                         pair.right.setString(mem);
//                     } else {
//                         pair.right.cloneJSONObject(new ValidatorError(15).error);
//                     }

//                 } else {
//                     pair.right.setString(mem);
//                 }
//             }
//         }
//     }

//     for (Pair < String, RawJSON > pair: this.idVersions) {
//         if (pair.left != null) {
//             String mem = (String) finalResult.get(CouchbasePool.toKVIDVersionKey(pair.left));
//             if (mem == null) {
//                 pair.right.cloneJSONObject(new ValidatorError(14).error);
//             } else {
//                 try {
//                     JSONObject builtObj = new JSONObject(mem);
//                     this.objectPrivilegeRetriever.addPathForObject(new Path(builtObj.getString("Full Path")), pair.right);
//                     this.awaitingPrivileges.put(pair.right, false);
//                     pair.right.setString(mem);
//                 } catch (JSONException e) {
//                     ServerDaemon.error(e);
//                 }
//             }
//         }
//     }

//     this.objectPrivilegeRetriever.run();

//     JSONObject result = new JSONObject();
//     result.put("Objects", addressArray);
//     return result;
// }

// @
// Override
// public void privilegeArrayAvailable(ArrayList < Object > array) {

//     for (Object obj: array) {
//         RawJSON rj = (RawJSON) obj;
//         this.awaitingPrivileges.remove(rj);

//     }
// }

// @
// Override
// public void endOfPrivileges() {
//     Set < Entry < RawJSON, Boolean >> entrySet = this.awaitingPrivileges.entrySet();

//     for (Entry < RawJSON, Boolean > entry: entrySet) {
//         entry.getKey().cloneJSONObject(new ValidatorError(14).error);
//     }
// }
// }