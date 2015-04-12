String.prototype.replaceAll = function(re, replace) {
    return this.replace(new RegExp(re, "g"), replace);
};

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
    maximumShortTypeMiddleName : 20,
    ROOT_USERNAME: "MinoDB"
};



Common.get_resource_type = function(this_address){

    if((typeof Path)==='undefined' && (typeof require)!=='undefined'){
        Path = require('./Path');
    }

    var type_of = typeof this_address;

    if (type_of === 'string') {

        var index_of_slash = this_address.indexOf('/');

        if (index_of_slash === -1) {
            //Could be a number or type
            var numeric_value = parseFloat(this_address);
            var is_integer = numeric_value % 1 === 0;
            if (isNaN(numeric_value)){
                return ["type",this_address];
            } else if(is_integer && numeric_value > 1) {
                return ["id",""+numeric_value];
            }
        } else if (index_of_slash === 0) {
            //First char is slash - must be pat

            var path = new Path();
            var path_error = path.init(this_address, true/*allow tilde*/);
            if (!path_error) {
                return ["path",path];
            }
        } else {
            //Could be id/version
            var split_1 = this_address.substring(0, index_of_slash);
            var num_1 = +split_1;
            var is_integer_1 = num_1 % 1 === 0;
            var split_2 = this_address.substring(index_of_slash + 1);
            var num_2 = +split_2;
            var is_integer_2 = num_2 % 1 === 0;

            if (isNaN(num_1) || !is_integer_1 || num_1 < 1 || isNaN(num_2) || !is_integer_2 || num_2 < 1) {
                return [null, null];
            } else {
                return ["id_version",[num_1,num_2]];
            }
        }
    } else if (type_of == 'number') {

        var is_integer = this_address % 1 === 0;
        if (is_integer && this_address > 0) {
            return ["id",""+this_address];
        }

    }

    return [null,null];
};

if (typeof module !== 'undefined') {
    module.exports = Common;
}