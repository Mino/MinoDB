module.exports = function(class_data){

	var class_name = class_data.name;

    var class_string = String(class_data)+"\n\n";

    console.log(class_name);
    for (var i in class_data) {
    	if (i != "superConstructor" && class_data.hasOwnProperty(i) && typeof class_data[i] == "function") {
    		console.log(i, typeof class_data[i], class_data[i]);
	    	class_string+=class_name+"."+i+" = "+String(class_data[i]) + "\n\n";
    	}
    }

    var proto = class_data.prototype;
    for(var i in proto){
        class_string+=class_name+".prototype."+i+" = "+String(proto[i])+"\n\n";
    }

    return class_string;
}