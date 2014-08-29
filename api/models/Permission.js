var FieldVal = require('fieldval');
var bval = require('fieldval-basicval');

var logger = require('tracer').console();
var Common = require('../../common_classes/Common');
var errors = require('../../errors')
var validators = require('../validators')
var Path = require('../../common_classes/Path');

function Permission() {
    var permission = this;

};

Permission.prototype.init = function(json, handler, saving_folder_list, saving_item_list) {
    var permission = this;


    var validator = new FieldVal(json);

    permission.granted_to = validator.get("granted_to", bval.string(true));
    if (permission.granted_to != null) {
        if (!Common.is_valid_username(permission.granted_to)) {
            validator.invalid("granted_to", Validator.Error(53));
        } else {
            if (permission.granted_to===handler.username) {
                validator.invalid("granted_to", Validator.Error(77));
            }
        }
    }

    permission.path = validator.get("path", bval.string(true), validators.path);
    if (permission.path != null) {
        permission.folder_name = permission.path.object_names[permission.path.length - 1];
        if (permission.path.username_for_permission(permission.granted_to, true)===handler.username && permission.path.length > 1) {

        } else {
            validator.invalid("path", Validator.Error(errors.CANT_GRANT_PATH));
        }
    }

    permission.grant_write = validator.get("grant_write", bval.boolean(true));
    if (permission.grant_write != null) {
        if (permission.granted_to != null) {
            if (permission.granted_to === ("Public") && permission.grant_write) {
                validator.invalid("grant_write", Validator.Error(125));
            }
        }
    }

    var error = validator.end();
    if(error!=null){
        return error;
    }

    var tildePath = Common.convert_path_to_tilde_path(permission.path.toString());

    // if (true) {
    //     var toSaveSentFolder = {};
    //     toSaveSentFolder.put("Name", permission.granted_to);
    //     toSaveSentFolder.put("Folder", true);
    //     toSaveSentFolder.put("Path", "/" + permission.username + "/Permissions/Sent/");
    //     savingFolderList.put(toSaveSentFolder);
    // }

    // if (true) {
    //     var toSaveReceivedFolder = {};
    //     toSaveReceivedFolder.put("Name", permission.username);
    //     toSaveReceivedFolder.put("Folder", true);
    //     toSaveReceivedFolder.put("Path", "/" + permission.granted_to + "/Permissions/Received/");
    //     savingFolderList.put(toSaveReceivedFolder);
    // }

    // if (true) {
    //     var toSaveSentr = {};
    //     toSaveSentr.put("Name", "Read " + tildePath);
    //     toSaveSentr.put("Folder", false);
    //     toSaveSentr.put("Path", "/" + permission.username + "/Permissions/Sent/" + permission.granted_to + "/");
    //     var fpv1Obj = {};
    //     fpv1Obj.put("Granted By", permission.username);
    //     fpv1Obj.put("Granted To", permission.granted_to);
    //     fpv1Obj.put("Folder Name", permission.folderName);
    //     fpv1Obj.put("Path", permission.folderPath);
    //     fpv1Obj.put("Permission", 0);
    //     toSaveSentr.put("Mino.Permission.1", fpv1Obj);
    //     savingItemList.put(toSaveSentr);
    // }
    // if (permission.writePermissions) {
    //     var toSaveSentw = {};
    //     toSaveSentw.put("Name", "Write " + tildePath);
    //     toSaveSentw.put("Folder", false);
    //     toSaveSentw.put("Path", "/" + permission.username + "/Permissions/Sent/" + permission.granted_to + "/");
    //     var fpv1Obj = {};
    //     fpv1Obj.put("Granted By", permission.username);
    //     fpv1Obj.put("Granted To", permission.granted_to);
    //     fpv1Obj.put("Folder Name", permission.folderName);
    //     fpv1Obj.put("Path", permission.folderPath);
    //     fpv1Obj.put("Permission", 1);
    //     toSaveSentw.put("Mino.Permission.1", fpv1Obj);
    //     savingItemList.put(toSaveSentw);
    // }
    // if (true) {
    //     var toSaveReceivedr = {};
    //     toSaveReceivedr.put("Name", "Read " + tildePath);
    //     toSaveReceivedr.put("Folder", false);
    //     toSaveReceivedr.put("Path", "/" + permission.granted_to + "/Permissions/Received/" + permission.username + "/");
    //     var fpv1Obj = {};
    //     fpv1Obj.put("Granted By", permission.username);
    //     fpv1Obj.put("Granted To", permission.granted_to);
    //     fpv1Obj.put("Folder Name", permission.folderName);
    //     fpv1Obj.put("Path", permission.folderPath);
    //     fpv1Obj.put("Permission", 0);
    //     toSaveReceivedr.put("Mino.Permission.1", fpv1Obj);
    //     savingItemList.put(toSaveReceivedr);
    // }
    // if (permission.writePermissions) {
    //     var toSaveReceivedw = {};
    //     toSaveReceivedw.put("Name", "Write " + tildePath);
    //     toSaveReceivedw.put("Folder", false);
    //     toSaveReceivedw.put("Path", "/" + permission.granted_to + "/Permissions/Received/" + permission.username + "/");
    //     var fpv1Obj = {};
    //     fpv1Obj.put("Granted By", permission.username);
    //     fpv1Obj.put("Granted To", permission.granted_to);
    //     fpv1Obj.put("Folder Name", permission.folderName);
    //     fpv1Obj.put("Path", permission.folderPath);
    //     fpv1Obj.put("Permission", 1);
    //     toSaveReceivedw.put("Mino.Permission.1", fpv1Obj);
    //     savingItemList.put(toSaveReceivedw);
    // }

    return null;
}

module.exports = Permission;