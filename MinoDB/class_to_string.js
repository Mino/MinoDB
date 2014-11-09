module.exports = function(class_data){

	var class_name = class_data.name;

    var class_string = String(class_data)+"\n\n";

    var proto = class_data.prototype;
    for(var i in proto){
        class_string+=class_name+".prototype."+i+" = "+String(proto[i])+"\n\n"
    }

    return class_string;
}