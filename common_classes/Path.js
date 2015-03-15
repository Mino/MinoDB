var Constants, Common, FieldVal, errors;
if (typeof require != 'undefined') {
    Constants = require('./Constants');
    Common = require('./Common');
    FieldVal = require('fieldval');
    errors = require('../errors')
}

function Path() {
    var path = this;

}

//Returns error or null
Path.prototype.init = function(path_string, allow_tilde) {
    var path = this;

    allow_tilde = allow_tilde || false;

    path.is_folder = false;
    path.path_string = path_string;
    path.object_names = [];
    path.sub_paths = [];

    path.string_length = path_string.length;
    if (path.string_length >= Constants.maximumAccessiblePathLength) {
        return errors.INVALID_PATH_FORMAT
    }
    var path_char = path.path_string.charAt(0);
    if (path_char != "/") { //Equal to forward slash
        return errors.INVALID_PATH_FORMAT; //First character must be a forward slash in a path
    }

    var last_char = "/";

    //The total number of objects
    var total = 0;
    for (var index = 1; index < path.string_length; index++) {
        path_char = path.path_string.substring(index, index + 1);
        if (path_char.charCodeAt(0) == 47) {
            if (last_char.charCodeAt(0) == 47) {
                return errors.INVALID_PATH_FORMAT; //There were two forward slashes together
            }
            total++;
        } else {
            if (!Path.is_valid_character_for_object_name(path_char, allow_tilde)) { //Check that path character is valid for a folder/object name
                return errors.INVALID_PATH_FORMAT;
            }
        }
        last_char = path_char;
    }

    if (last_char.charCodeAt(0) == 47) {
        path.is_folder = true;
    }

    var current_index = 0;
    var current_position = 1;
    var name_start_index = 1;
    while (current_index < total) {
        path_char = path.path_string.charAt(current_position);
        if (path_char.charCodeAt(0) === 47) {
            path.sub_paths.push(path.path_string.substring(0, current_position + 1));
            path.object_names.push(path.path_string.substring(name_start_index, current_position));
            current_index++;
            name_start_index = current_position + 1;
        }
        current_position++;
    }
    if (!path.is_folder) {
        path.sub_paths.push(path.path_string);
        path.object_names.push(path.path_string.substring(name_start_index, path.string_length));
    }

    path.length = path.object_names.length;

    return null;
}

Path.prototype.replace_id_operator = function(id){
    var path = this;


}

Path.object_name_check = function(allowed_tilde){

    return function(val, emit){

        //Remove ~id~ because it will be overwritten (no other tildes are allowed)
        var value = val.replaceAll("~id~","");

        for(var i = 0; i < value.length; i++){
            var character = value[i];

            if(!Path.is_valid_character_for_object_name(character, allowed_tilde)){
                return errors.INVALID_OBJECT_NAME;
            }
        }
    }
}

Path.is_valid_character_for_object_name = function(path_char, allowed_tilde) {

    var path_char_code = path_char.charCodeAt(0);

    if (
        path_char_code === 10 /*LINE BREAK*/ || 
        path_char_code === 30 || /*WHITESPACE*/
        path_char_code === 31 || /*WHITESPACE*/
        path_char === '/' || 
        (allowed_tilde!==true && path_char_code === 126 /*TILDE*/ )
    ) {
        return false;
    }
    return true;
}

Path.prototype.to_tilde_path = function(){
    var path = this;

    return Common.convert_path_to_tilde_path(path.toString())
}

Path.prototype.permission_path = function(requesting_username,for_write){
    var path = this;

    var user = path.username_for_permission(requesting_username,for_write);

    return "/"+requesting_username+"/permissions/received/"+Common.convert_path_to_tilde_path(path.toString());
}

Path.prototype.username_for_permission = function(requesting_username, for_write) {
    var path = this;

    //Restricts access to the permissions folder in each user's root
    if (path.object_names.length > 1 && path.object_names[1] == "permissions") {

        console.log("USERNAME FOR PERMISSION ",path.toString(), requesting_username);

        if (path.object_names.length==2 && !path.is_folder) {
            /* The request is for an item with the same name as one of the restricted folders, not the folder itself
             * so return the username of the top folder.
             */
            return path.object_names[0];
        }

        //Allows read access of permissions by user
        if (for_write===false) {
            return path.object_names[0];
        }

        //Allows "Mino" user to write
        if(requesting_username==="Mino"){
            return "Mino";
        }

        return null;
    }


    //Allow all users to read the types folder
    if (path.object_names.length > 1 && path.object_names[0] === "Mino" && path.object_names[1] === "types"){
        if(for_write===false){
            return requesting_username;
        }
    }

    if(path.object_names.length===0){
        return "Mino";
    }

    return path.object_names[0];
}

Path.prototype.path_for_child_with_name = function(child_name, child_is_folder) {
    var path = this;

    if (!path.is_folder) {
        return errors.CHILD_FROM_ITEM_PATH;
    }
    var child_path = new Path();
    child_path.length = path.length + 1;
    child_path.object_names = [];
    child_path.sub_paths = [];
    for (var i = 0; i < child_path.length; i++) {
        child_path.object_names.push(path.object_names[i]);
        child_path.sub_paths.push(path.sub_paths[i]);
    }
    if (child_is_folder) {
        child_path.is_folder = true;
        child_path.path_string = path.path_string + child_name + "/";
    } else {
        child_path.is_folder = false;
        child_path.path_string = path.path_string + child_name;
    }
    child_path.object_names[child_path.length - 1] = child_name;
    child_path.sub_paths[child_path.length - 1] = child_path.path_string;
    return child_path;
}

Path.prototype.parent_path = function() {
    var path = this;

    if (path.length == 1) {
        return null;
    }

    var parent_path = new Path();
    parent_path.length = path.length - 1;
    parent_path.object_names = [];
    parent_path.sub_paths = [];
    for (var i = 0; i < parent_path.length; i++) {
        parent_path.object_names.push(path.object_names[i]);
        parent_path.sub_paths.push(path.sub_paths[i]);
    }
    parent_path.is_folder = true;
    parent_path.path_string = parent_path.sub_paths[parent_path.length - 1];
    return parent_path;
}

Path.prototype.toString = function() {
    var path = this;
    return path.path_string;
}

if (typeof module != 'undefined') {
    module.exports = Path;
}