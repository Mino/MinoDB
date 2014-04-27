function LocationField(details){
		
		this.latitudeDiv = $("<div />")
		.css("float","left")
		.css("width","200px")
		.css("margin-right","5px")
		.css("margin-bottom","5px")
		.appendTo(details.valueField);
				
		this.latitudeSpan = $("<div />")
		.css("font-weight","bold")
		.text("Latitude ")
		.appendTo(this.latitudeDiv);
		
		this.latitudeInput = $("<input type=\"text\"/>")
		.addClass("minofieldinput")
		.addClass("numericinput")
		.appendTo(this.latitudeDiv);
		
		this.latitudeValue = $("<div />")
		.addClass("minofieldvalue")
		.appendTo(this.latitudeDiv)
		.show();
		
		this.latitudeError = $("<div />")
		.css("padding","5px")
		.css("width","179px")
		.addClass("errorgradient")
		.text("Error")	
		.appendTo(this.latitudeDiv)
		.hide();
		
		
		
		this.longitudeDiv = $("<div />")
		.css("float","left")
		.css("width","200px")
		.appendTo(details.valueField);
		
		this.longitudeSpan = $("<div />")
		.css("font-weight","bold")
		.text("Longitude ")
		.appendTo(this.longitudeDiv);

		this.longitudeInput = $("<input type=\"text\"/>")
		.addClass("minofieldinput")
		.addClass("numericinput")
		.appendTo(this.longitudeDiv);
		
		this.longitudeValue = $("<div />")
		.addClass("minofieldvalue")
		.appendTo(this.longitudeDiv)
		.show();	
				
		this.longitudeError = $("<div />")
		.css("padding","5px")
		.css("width","179px")
		.addClass("errorgradient")
		.text("Error")
		.appendTo(this.longitudeDiv)
		.hide();
		
		
					
		this.updateViewFunction = function(){
		
			$(this.latitudeError).hide();
			$(this.longitudeError).hide();
		
			var currentValue = details.getValue();
			if(currentValue==""){
				currentValue = {
					"location" : {
						"lat" : 0.0,
						"lon" : 0.0
					}
				}					
			}

			if($(details.element).data("Editing")==true){
				$(this.latitudeInput).val(currentValue['location']['lat']).show();
				$(this.longitudeInput).val(currentValue['location']['lon']).show();
				$(this.latitudeValue).hide();
				$(this.longitudeValue).hide();
			} else {
				$(this.latitudeValue).text(currentValue['location']['lat']).show();
				$(this.longitudeValue).text(currentValue['location']['lon']).show();
				$(this.latitudeInput).hide();
				$(this.longitudeInput).hide();
			}
		}
		
		this.compileFunction = function(){			
			return {
				"location" : {
					"lat" : $(this.latitudeInput).val(),
					"lon" : $(this.longitudeInput).val()
				}
			};				
		}
		
		this.customErrorFunction = function(){
			var errorStruct = $(details.valueField).data("Error");
			if(errorStruct['Invalid']['location']['Invalid']['lat']!=undefined){
				$(this.latitudeError).show().text(errorStruct['Invalid']['location']['Invalid']['lat']['Error']);
			}
			
			if(errorStruct['Invalid']['location']['Invalid']['lon']!=undefined){
				$(this.longitudeError).show().text(errorStruct['Invalid']['location']['Invalid']['lon']['Error']);
			}
		}

	
}