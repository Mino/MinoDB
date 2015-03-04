var logger = require('tracer').console();
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;
var FVRule = require('fieldval-rules');

function Type(item) {
    var type = this;

    type.item = item;

    type.name = item.name;

    type.rule = item['mino_type'];
}

Type.rule = new FVRule();
Type.rule_definition = {
    name: "mino_type",
    display_name: "Type",
    type: "object",
    any: true
}
Type.rule.init(Type.rule_definition)

Type.prototype.init = function(type_data){
    var type = this;

    type.item['mino_type'] = type_data;

    type.rule = type_data;
}

Type.validate = function(data, creation){
    var rule = new FVRule();
    var type_error = rule.init(
        data,
        {
            need_name: true,
            allow_dots: false
        }
    );

    //Perform an extra check on the name
    var validator = new FieldVal(data, type_error);
    validator.get("name", BasicVal.string(true), BasicVal.start_with_letter(), BasicVal.no_whitespace());

    return validator.end();
}

Type.prototype.create_save_data = function(callback){
    var type = this;

    var to_save = JSON.parse(JSON.stringify(type.data));
    callback(null, to_save);
}

Type.prototype.save = function(api, callback){
    var type = this;

    type.item.path = "/Mino/types/";

    new api.handlers.save(api, {
        "username": "Mino"
    }, {
        "objects": [
            type.item
        ]
    }, function(save_err, save_res){
        logger.log(JSON.stringify(save_err,null,4), save_res);

        callback(null, save_res);
    })
}

Type.get = function(typename, api, callback){
    new api.handlers.get(api, {
        "username": "Mino"
    }, {
        "addresses": [
            "/Mino/types/"+typename
        ]
    }, function(get_err, get_res){
        logger.log(get_err, get_res);

        if(get_err){
            throw new Error("Unexpected API error");
        }

        var type_item = get_res.objects[0];
        if(type_item){
            callback(null, new Type(type_item));
        } else {
            callback(null, null);
        }
    })
}

Type.create = function(data, api, callback){
    
    var error = Type.validate(data, true);
    if(error){
        callback(error,null);
        return;
    }

    var type = new Type(data);
    type.save(api, callback);
}

module.exports = Type;