var logger = require('mino-logger');
var ConfigServer = require('./config_server/ConfigServer');
var Path = require('../../common_classes/Path');

var GROUP_PERMISSION_TYPE = 'minodb_group_permission';
var IDENTIFIER_GROUP_TYPE = 'minodb_identifier_group';
var IDENTIFIER_PERMISSION_TYPE = 'minodb_identifier_permission';

function MinoDbPermissions(options) {
	var plugin = this;

    plugin.path = options.path;
    if (!plugin.path) {
        throw "Plugin requires path to be specified in options";
    }

    plugin.username = options.username;
    if (!plugin.username) {
        throw "Plugin requires username to be specified in options";
    }

    plugin.name = options.name || "minodb_permissions";
    plugin.display_name = options.display_name || plugin.name;

    plugin.permission_path = plugin.path + "permissions/";
    plugin.group_path = plugin.path + "groups/";

    plugin.config_server = new ConfigServer();
}

MinoDbPermissions.prototype.get_config_server = function(){
    var plugin = this;
    return plugin.config_server.express_server;
};

MinoDbPermissions.prototype.info = function(){
    var plugin = this;

    return {
        name: plugin.name,
        display_name: plugin.display_name
    };
};

MinoDbPermissions.prototype.init = function(minodb, callback){
    var plugin = this;
    plugin.minodb = minodb;
    plugin.sdk = minodb.with_user(plugin.username);

    var waiting_for = 2;
    var finished_one = function() {
        waiting_for--;
        if (waiting_for === 0) {
            callback();
        }
    };

    plugin.create_folders(finished_one);
    plugin.create_types(finished_one);
};

MinoDbPermissions.prototype.create_folders = function(callback) {
    var plugin = this;

    var path = new Path();
    path.init(plugin.path);

    var parent_path = path.parent_path();

    plugin.sdk.save([{
        name: path.object_names[path.length-1],
        path: parent_path.toString(),
        folder: true
    }], function(err, res) {

        logger.debug(JSON.stringify(err, null, 4),res);
        plugin.sdk.save([{
            name: 'permissions',
            path: plugin.path,
            folder: true
        },{
            name: 'groups',
            path: plugin.path,
            folder: true
        }], function(err, res) {
            logger.debug(err,res);
            callback(err,res);
        });

    });
};

MinoDbPermissions.prototype.create_types = function(callback) {
    var plugin = this;

    plugin.minodb.save_type({
        "name": GROUP_PERMISSION_TYPE,
        "display_name": "MinoDB Group Permission",
        "type": "object",
        "any": false,
        "fields": [
            {
                "name": "group",
                "display_name": "Group",
                "type": "text"
            },
            {
                "name": "permission",
                "display_name": "Permission",
                "type": "text"
            }
        ]
    }, function(err, res) {
        logger.debug(err, res);

        if (err) {
            callback(err);
            return;
        }

        plugin.minodb.save_type({
            "name": IDENTIFIER_PERMISSION_TYPE,
            "display_name": "MinoDB Identifier Permission",
            "type": "object",
            "any": false,
            "fields": [
                {
                    "name": "identifier",
                    "display_name": "Identifier",
                    "type": "text"
                },
                {
                    "name": "permission",
                    "display_name": "Permission",
                    "type": "text"
                }
            ]
        }, function(err, res) {
            logger.debug(err, res);

            if (err) {
                callback(err);
                return;
            }

            plugin.minodb.save_type({
                "name": IDENTIFIER_GROUP_TYPE,
                "display_name": "MinoDB Identifier Group",
                "type": "object",
                "any": false,
                "fields": [
                    {
                        "name": "identifier",
                        "display_name": "Identifier",
                        "type": "text"
                    },
                    {
                        "name": "group",
                        "display_name": "Group",
                        "type": "text"
                    }
                ]
            }, function(err, res) {
                logger.debug(err, res);

                if (err) {
                    callback(err);
                    return;
                }

                callback();
            });
        });
    });
};

MinoDbPermissions.prototype.assign_item = function(name, parent, type, callback) {
    var plugin = this;

    var escaped_name = plugin.get_item_name_from_type(type, name);
    var escaped_parent = plugin.encode_text(parent);
    var root_path = plugin.get_root_path_from_type(type);

    var save_object = {
        name: escaped_name,
        path: root_path + escaped_parent + '/'
    };
    
    if (type === GROUP_PERMISSION_TYPE) {
        save_object[type] = {
            group: name,
            permission: parent
        };
    } else if (type === IDENTIFIER_GROUP_TYPE) {
        save_object[type] = {
            identifier: name,
            group: parent
        };
    } else if (type === IDENTIFIER_PERMISSION_TYPE) {
        save_object[type] = {
            identifier: name,
            permission: parent
        };
    }

    logger.debug(save_object);

    plugin.sdk.save([{
        name: escaped_parent,
        path: root_path,
        folder: true
    }], function(err, res) {
        logger.debug(err, res);

        plugin.sdk.save([save_object], function(err, res) {
            logger.debug(err,res);
            if (err) {
                callback(err);
            } else {
                callback(null, res.objects[0]);
            }
        });
    });
};

MinoDbPermissions.prototype.remove_item = function(name, parent, type, callback) {
    var plugin = this;

    var escaped_name = plugin.get_item_name_from_type(type, name);
    var escaped_parent = plugin.encode_text(parent);
    var root_path = plugin.get_root_path_from_type(type);

    var path = root_path + escaped_parent + '/' + escaped_name;
    logger.debug(path);
    plugin.sdk.delete([path], function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res.objects[0]);
        }
    });
};

MinoDbPermissions.prototype.assign_permission_to_id = function(permission, id, callback) {
    var plugin = this;
    plugin.assign_item(id, permission, IDENTIFIER_PERMISSION_TYPE, callback);
};

MinoDbPermissions.prototype.remove_permission_from_id = function(permission, id, callback) {
    var plugin = this;
    plugin.remove_item(id, permission, IDENTIFIER_PERMISSION_TYPE, callback);
};

MinoDbPermissions.prototype.assign_group_to_id = function(group, id, callback) {
    var plugin = this;
    plugin.assign_item(id, group, IDENTIFIER_GROUP_TYPE, callback);
};

MinoDbPermissions.prototype.remove_group_from_id = function(group, id, callback) {
    var plugin = this;
    plugin.remove_item(id, group, IDENTIFIER_GROUP_TYPE, callback);
};

MinoDbPermissions.prototype.assign_permission_to_group = function(permission, group, callback) {
    var plugin = this;
    plugin.assign_item(group, permission, GROUP_PERMISSION_TYPE, callback);
};

MinoDbPermissions.prototype.remove_permission_from_group = function(permission, group, callback) {
    var plugin = this;
    plugin.remove_item(group, permission, GROUP_PERMISSION_TYPE, callback);
};

MinoDbPermissions.prototype.has_permission = function(permission, id, callback) {
    var plugin = this;

    plugin.has_permissions([permission], id, function(err, has_permissions) {
        logger.debug(err, has_permissions);
        if (err) {
            callback(err);
        } else {
            callback(null, has_permissions[0]);
        }
    });
};

MinoDbPermissions.prototype.has_permissions = function(permissions, id, callback) {
    var plugin = this;

    var permission_results = {};
    for (var i=0; i<permissions.length; i++) {
        var permission = permissions[i];
        permission_results[permission] = false;
    }

    var check_individual_permissions = function(callback) {
        plugin.sdk.call({
            "function": "search",
            "parameters": {
                "paths": [plugin.permission_path],
                "query": {
                    "minodb_identifier_permission.identifier": id,
                    "minodb_identifier_permission.permission": {
                        "$in": permissions
                    }
                },
                "include_subfolders": true
            }
        }, function(err, res) {
            logger.debug(err, res);
            if (res.objects) {
                for (var i=0; i<res.objects.length; i++) {
                    var permission = res.objects[i].minodb_identifier_permission.permission;
                    permission_results[permission] = true;
                }
            }
            callback();
        });
    };

    var check_group_permissions = function(callback) {
        plugin.sdk.call({
            "function": "search",
            "parameters": {
                "paths": [plugin.permission_path],
                "query": {
                    "minodb_group_permission.permission": {
                        "$in" : permissions
                    }
                },
                "include_subfolders": true
            }
        }, function(err, res) {

            if (err || !res.objects) {
                callback();
                return;
            }

            var groups = [];
            var group_permissions = {};
            for (var i=0; i< res.objects.length; i++) {
                var group = res.objects[i].minodb_group_permission.group;
                groups.push(group);
                if (!group_permissions[group]) {
                    group_permissions[group] = [];
                }
                group_permissions[group].push(res.objects[i].minodb_group_permission.permission);
            }
            logger.debug(groups);

            plugin.sdk.call({
                "function": "search",
                "parameters": {
                    "paths": [plugin.group_path],
                    "query": {
                        "minodb_identifier_group.identifier": id,
                        "minodb_identifier_group.group": {
                            "$in": groups
                        }
                    },
                    "include_subfolders": true
                }
            }, function(err, res) {
                logger.debug(res);
                if (err || !res.objects) {
                    callback();
                    return;
                }

                for (var i=0; i<res.objects.length; i++) {
                    var group = res.objects[i].minodb_identifier_group.group;
                    for (var j=0; j<group_permissions[group].length; j++) {
                        var permission  = group_permissions[group][j];
                        if (permission_results[permission] === false) {
                            permission_results[permission] = true;
                        }
                    }
                }

                callback();
            });

        });
    };

    check_individual_permissions(function() {
        check_group_permissions(function() {
            var result = [];
            for (var i=0; i<permissions.length; i++) {
                var permission = permissions[i];
                result.push(permission_results[permission]);
            }
            callback(null, result);
        });
    });
};

MinoDbPermissions.prototype.get_root_path_from_type = function(type) {
    var plugin = this;
    if (type === GROUP_PERMISSION_TYPE) {
        return plugin.permission_path;
    } else if (type === IDENTIFIER_GROUP_TYPE) {
        return plugin.group_path;
    } else if (type === IDENTIFIER_PERMISSION_TYPE) {
        return plugin.permission_path;
    }
};

MinoDbPermissions.prototype.get_item_name_from_type = function() {
    var plugin = this;
    var type = arguments[0];
    var name = plugin.encode_text(arguments[1]);

    if (type === GROUP_PERMISSION_TYPE) {
        return 'group:'+name;
    } else if (type === IDENTIFIER_GROUP_TYPE) {
        return 'id:'+name;
    } else if (type === IDENTIFIER_PERMISSION_TYPE) {
        return 'id:'+name;
    }
};

MinoDbPermissions.prototype.encode_text = function(text) {
    return encodeURIComponent(text);
};

MinoDbPermissions.prototype.decode_text = function(text) {
    return decodeURIComponent(text);
};

MinoDbPermissions.prototype.get_available_groups = function(callback) {
    var plugin = this;
    plugin.sdk.call({
        "function": "search",
        "parameters": {
            "paths": [plugin.permission_path],
            "include_subfolders": true,
            "query": {
                "minodb_group_permission": {
                    "$exists": true
                }
            }
        }
    }, function(err, res) {
        logger.debug(err, res);
        var result = [];
        for (var i=0; i<res.objects.length; i++) {
            var group = res.objects[i].minodb_group_permission.group;
            result.push(group);
        }

        callback(null, result);
        
    });
};

MinoDbPermissions.prototype.get_ids_from_group = function(group, callback) {
    var plugin = this;
    plugin.get_ids_from_groups([group], callback);
};

MinoDbPermissions.prototype.get_ids_from_groups = function(groups, callback) {
    var plugin = this;
    plugin.sdk.call({
        "function": "search",
        "parameters": {
            "paths": [plugin.group_path],
            "include_subfolders": true,
            "query": {
                "minodb_identifier_group.group": {
                    "$in": groups
                }
            }
        }
    }, function(err, res) {
        logger.debug(err, res);
        var result = [];
        for (var i=0; i<res.objects.length; i++) {
            var id = res.objects[i].minodb_identifier_group.identifier;
            if (result.indexOf(id) === -1) {
                result.push(id);
            }
        }

        callback(null, result);
        
    });
};

MinoDbPermissions.prototype.get_groups_from_perm = function(perm, callback) {
    var plugin = this;
    plugin.sdk.call({
        "function": "search",
        "parameters": {
            "paths": [plugin.permission_path + perm + "/"],
            "query": {
                "minodb_group_permission": {
                    "$exists": true
                }
            }
        }
    }, function(err, res) {
        logger.debug(err, res);
        
        var result = [];
        for (var i=0; i<res.objects.length; i++) {
            var group = res.objects[i].minodb_group_permission.group;
            result.push(group);
        }

        callback(null, result);
        
    });
};

MinoDbPermissions.prototype.get_ids_from_perm = function(perm, callback) {
    var plugin = this;
    plugin.sdk.call({
        "function": "search",
        "parameters": {
            "paths": [plugin.permission_path + perm + "/"],
            "query": {
                "minodb_identifier_permission": {
                    "$exists": true
                }
            }
        }
    }, function(err, res) {
        logger.debug(err, res);
        var result = [];
        for (var i=0; i<res.objects.length; i++) {
            var id = res.objects[i].minodb_identifier_permission.identifier;
            result.push(id);
        }

        plugin.get_groups_from_perm(perm, function(err, groups) {
            logger.debug(err, groups);
            plugin.get_ids_from_groups(groups, function(err, ids) {
                logger.debug(err, ids);
                for (var i=0; i<ids.length; i++) {
                    if (result.indexOf(ids[i]) === -1) {
                        result.push(ids[i]);
                    }
                }

                callback(null, result);

            });
        });
    });
};

module.exports = MinoDbPermissions;