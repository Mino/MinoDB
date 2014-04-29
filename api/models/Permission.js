var FieldVal = require('../../../FieldVal/fieldval-js/lib/fieldval');
var logger = require('tracer').console();
var Common = require('../Common');
var errors = require('../errors')
var validators = require('../validators')
var Path = require('./Path');

function Privilege() {
    var privilege = this;

};

Privilege.prototype.init = function(json, handler, saving_folder_list, saving_item_list) {
    var privilege = this;


    var validator = new Validator(json);

    privilege.granted_to = validator.get("granted_to", "string", true);
    if (privilege.granted_to != null) {
        if (!Common.is_valid_username(privilege.granted_to)) {
            validator.invalid("granted_to", Validator.Error(53));
        } else {
            if (privilege.granted_to===handler.username) {
                validator.invalid("granted_to", Validator.Error(77));
            }
        }
    }

    privilege.path = validator.get("path", "string", true, validators.path);
    if (privilege.path != null) {
        privilege.folder_name = privilege.path.object_names[privilege.path.length - 1];
        if (privilege.path.username_for_privilege(privilege.granted_to, true)===handler.username && privilege.path.length > 1) {

        } else {
            validator.invalid("path", Validator.Error(errors.CANT_GRANT_PATH));
        }
    }

    privilege.grant_write = validator.get("grant_write", "boolean", true);
    if (privilege.grant_write != null) {
        if (privilege.granted_to != null) {
            if (privilege.granted_to === ("Public") && privilege.grant_write) {
                validator.invalid("grant_write", Validator.Error(125));
            }
        }
    }

    var error = validator.end();
    if(error!=null){
        return error;
    }

    var tildePath = Common.convert_path_to_tilde_path(privilege.path.toString());

    // if (true) {
    //     var toSaveSentFolder = {};
    //     toSaveSentFolder.put("Name", privilege.granted_to);
    //     toSaveSentFolder.put("Folder", true);
    //     toSaveSentFolder.put("Path", "/" + privilege.username + "/Privileges/Sent/");
    //     savingFolderList.put(toSaveSentFolder);
    // }

    // if (true) {
    //     var toSaveReceivedFolder = {};
    //     toSaveReceivedFolder.put("Name", privilege.username);
    //     toSaveReceivedFolder.put("Folder", true);
    //     toSaveReceivedFolder.put("Path", "/" + privilege.granted_to + "/Privileges/Received/");
    //     savingFolderList.put(toSaveReceivedFolder);
    // }

    // if (true) {
    //     var toSaveSentr = {};
    //     toSaveSentr.put("Name", "Read " + tildePath);
    //     toSaveSentr.put("Folder", false);
    //     toSaveSentr.put("Path", "/" + privilege.username + "/Privileges/Sent/" + privilege.granted_to + "/");
    //     var fpv1Obj = {};
    //     fpv1Obj.put("Granted By", privilege.username);
    //     fpv1Obj.put("Granted To", privilege.granted_to);
    //     fpv1Obj.put("Folder Name", privilege.folderName);
    //     fpv1Obj.put("Path", privilege.folderPath);
    //     fpv1Obj.put("Permission", 0);
    //     toSaveSentr.put("Mino.Privilege.1", fpv1Obj);
    //     savingItemList.put(toSaveSentr);
    // }
    // if (privilege.writePrivileges) {
    //     var toSaveSentw = {};
    //     toSaveSentw.put("Name", "Write " + tildePath);
    //     toSaveSentw.put("Folder", false);
    //     toSaveSentw.put("Path", "/" + privilege.username + "/Privileges/Sent/" + privilege.granted_to + "/");
    //     var fpv1Obj = {};
    //     fpv1Obj.put("Granted By", privilege.username);
    //     fpv1Obj.put("Granted To", privilege.granted_to);
    //     fpv1Obj.put("Folder Name", privilege.folderName);
    //     fpv1Obj.put("Path", privilege.folderPath);
    //     fpv1Obj.put("Permission", 1);
    //     toSaveSentw.put("Mino.Privilege.1", fpv1Obj);
    //     savingItemList.put(toSaveSentw);
    // }
    // if (true) {
    //     var toSaveReceivedr = {};
    //     toSaveReceivedr.put("Name", "Read " + tildePath);
    //     toSaveReceivedr.put("Folder", false);
    //     toSaveReceivedr.put("Path", "/" + privilege.granted_to + "/Privileges/Received/" + privilege.username + "/");
    //     var fpv1Obj = {};
    //     fpv1Obj.put("Granted By", privilege.username);
    //     fpv1Obj.put("Granted To", privilege.granted_to);
    //     fpv1Obj.put("Folder Name", privilege.folderName);
    //     fpv1Obj.put("Path", privilege.folderPath);
    //     fpv1Obj.put("Permission", 0);
    //     toSaveReceivedr.put("Mino.Privilege.1", fpv1Obj);
    //     savingItemList.put(toSaveReceivedr);
    // }
    // if (privilege.writePrivileges) {
    //     var toSaveReceivedw = {};
    //     toSaveReceivedw.put("Name", "Write " + tildePath);
    //     toSaveReceivedw.put("Folder", false);
    //     toSaveReceivedw.put("Path", "/" + privilege.granted_to + "/Privileges/Received/" + privilege.username + "/");
    //     var fpv1Obj = {};
    //     fpv1Obj.put("Granted By", privilege.username);
    //     fpv1Obj.put("Granted To", privilege.granted_to);
    //     fpv1Obj.put("Folder Name", privilege.folderName);
    //     fpv1Obj.put("Path", privilege.folderPath);
    //     fpv1Obj.put("Permission", 1);
    //     toSaveReceivedw.put("Mino.Privilege.1", fpv1Obj);
    //     savingItemList.put(toSaveReceivedw);
    // }

    return null;
}

module.exports = Privilege;