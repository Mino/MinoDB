var Constants = require('../Constants');
var Common = require('../Common');
var FieldVal = require('../../../../FieldVal/fieldval-js/fieldval');
var errors = require('../errors')

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
    if (path.string_length < 3) { //Length must be at least 3 (One forward slash, at least one character and another forward slash)
        return FieldVal.Error(8)
    } else if (path.string_length >= Constants.maximumAccessiblePathLength) {
        return FieldVal.Error(8)
    }
    var path_char = path.path_string.charAt(0);
    if (path_char != "/") { //Equal to forward slash
        return FieldVal.Error(8); //First character must be a forward slash in a path
    }

    var last_char = "/";

    //The total number of objects
    var total = 0;
    for (var index = 1; index < path.string_length; index++) {
        path_char = path.path_string.substring(index, index + 1);
        if (path_char.charCodeAt(0) == 47) {
            if (last_char.charCodeAt(0) == 47) {
                return FieldVal.Error(8); //There were two forward slashes together
            }
            total++;
        } else {
            if (!Path.is_valid_character_for_object_name(path_char, allow_tilde)) { //Check that path character is valid for a folder/object name
                return FieldVal.Error(8);
            }
        }
        last_char = path_char;
    }
    if (total == 0) { //path is a single item path e.g. "/Item"
        return FieldVal.Error(8)
    }

    if (last_char.charCodeAt(0) == 47) {
        path.is_folder = true;
    }

    var current_index = 0;
    var current_position = 1;
    var name_start_index = 1;
    while (current_index < total) {
        path_char = path.path_string.charAt(current_position);
        if (path_char.charCodeAt(0) == 47) {
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


Path.is_valid_character_for_object_name = function(path_char, allowed_tilde) {

    var path_char_code = path_char.charCodeAt(0);

    if (path_char_code == 10 /*LINE BREAK*/ || path_char_code == 30 || path_char_code == 31 || path_char_code == '/' || (!allowed_tilde && path_char_code == 126 /*tilde*/ )) {
        return false;
    }
    return true;

}

Path.prototype.permission_path = function(requesting_username,for_write){
    var path = this;

    var user = path.username_for_permission(requesting_username,for_write);

    return "/"+requesting_username+"/Permissions/"+user+"/"+Common.convert_path_to_tilde_path(path.toString());
}

Path.prototype.username_for_permission = function(requesting_username, for_write) {
    var path = this;

    //Restricts access to the Permissions folder in each user's root
    if (path.object_names.length > 1 && path.object_names[1] == "Permissions") {

        if (path.object_names.length==2 && !path.is_folder) {
            /* The request is for an item with the same name as one of the restricted folders, not the folder itself
             * so return the username of the top folder.
             */
            return path.object_names[0];
        }

        //Allows read access of permissions by user
        if (path.object_names[0] == requesting_username && !for_write) {
            return requesting_username;
        }

        //Allows "Mino" user to write
        if(requesting_username==="Mino"){
            return "Mino";
        }

        return null;
    }

    return path.object_names[0];
}

Path.prototype.path_for_child_with_name = function(child_name, child_is_folder) {
    var path = this;

    if (!path.is_folder) {
        return FieldVal.Error(117)
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

module.exports = Path;