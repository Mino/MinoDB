module.exports = function(class_data){

	var class_name = class_data.name;
	var super_class_name = null;

    var class_string = String(class_data)+"\n\n";

    for (var i in class_data) {
    	if (class_data.hasOwnProperty(i)) {

	    	if (i=="superConstructor") {
	    		super_class_name = class_data[i].name;
	    	} else if (i!=="superClass") {
		    	class_string+=class_name+"."+i+" = "+String(class_data[i]) + "\n\n";
	    	}

    	}
    }

    var proto = class_data.prototype;
    for(var i in proto){
    	if (i!=="constructor") {
	        class_string+=class_name+".prototype."+i+" = "+String(proto[i])+"\n\n";
    	}
    }

    if (super_class_name) {
    	class_string = "extend("+class_name+", "+super_class_name+")\n\n" + class_string;
    }

    return class_string;
}