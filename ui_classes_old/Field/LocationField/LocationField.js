function LocationField(field,details){	
	var locField = this;
	locField.field = field;
	locField.details = details;

	locField.distanceFromField = locField.details['Parameters']['Distance From']!=undefined;

	locField.element = $("<div />");

	var onChangeCallback = function(){
		locField.onChange();
	}

	locField.latitudeSpan = $("<div />")
	.css("font-weight","bold")
	.css("clear","left")
	.text("Latitude")
	.appendTo(locField.element);

	var latitudeInputDetails ={
		'Field Type' : 'Text',
		'Standalone' : true
	};
	var latitudeTable = $("<table />")
	.addClass("sectiontable")
	.appendTo(locField.element);

	locField.latitudeField = new Field(latitudeInputDetails);
	locField.latitudeField.element.appendTo(latitudeTable);
	locField.latitudeField.errorElement.appendTo(latitudeTable);

	locField.latitudeField.input.onChangeCallback = onChangeCallback;

	locField.longitudeSpan = $("<div />")
	.css("font-weight","bold")
	.css("clear","left")
	.text("Longitude")
	.appendTo(locField.element);

	var longitudeInputDetails ={
		'Field Type' : 'Text',
		'Standalone' : true
	};
	var longitudeTable = $("<table />")
	.addClass("sectiontable")
	.appendTo(locField.element);

	locField.longitudeField = new Field(longitudeInputDetails);
	locField.longitudeField.element.appendTo(longitudeTable);
	locField.longitudeField.errorElement.appendTo(longitudeTable);

	locField.longitudeField.input.onChangeCallback = onChangeCallback;



	if(locField.distanceFromField){
		
		locField.minimumDistanceSpan = $("<div />")
		.css("font-weight","bold")
		.css("clear","left")
		.text("Minimum Distance")
		.appendTo(locField.element);

		var minimumDistanceInputDetails ={
			'Field Type' : 'Number',
			'Standalone' : true
		};
		var minimumDistanceTable = $("<table />")
		.addClass("sectiontable")
		.appendTo(locField.element);

		locField.minimumDistanceField = new Field(minimumDistanceInputDetails);
		locField.minimumDistanceField.element.appendTo(minimumDistanceTable);
		locField.minimumDistanceField.errorElement.appendTo(minimumDistanceTable);


		locField.maximumDistanceSpan = $("<div />")
		.css("font-weight","bold")
		.css("clear","left")
		.text("Maximum Distance")
		.appendTo(locField.element);

		var maximumDistanceInputDetails ={
			'Field Type' : 'Number',
			'Standalone' : true
		};
		var maximumDistanceTable = $("<table />")
		.addClass("sectiontable")
		.appendTo(locField.element);

		locField.maximumDistanceField = new Field(maximumDistanceInputDetails);
		locField.maximumDistanceField.element.appendTo(maximumDistanceTable);
		locField.maximumDistanceField.errorElement.appendTo(maximumDistanceTable);

	} else {
		locField.addressSpan = $("<div />")
		.css("font-weight","bold")
		.css("clear","left")
		.text("Address")
		.appendTo(locField.element);

		var addressInputDetails ={
			'Field Type' : 'Text',
			'Standalone' : true
		};
		var addressTable = $("<table />")
		.addClass("sectiontable")
		.appendTo(locField.element);

		locField.addressField = new Field(addressInputDetails);
		locField.addressField.element.appendTo(addressTable);
		locField.addressField.errorElement.appendTo(addressTable);

	}

	locField.map = new Map();
	locField.map.markerMoved = function(lat,lon){
		locField.latitudeField.setValue(lat);
		locField.longitudeField.setValue(lon);
	}
	locField.map.element.appendTo(locField.element);

	var currentValue = locField.field.getValue();
	var lat = null, lon = null;
	if(!(currentValue==null || currentValue=="")){
		lat = currentValue['Location']['lat'];
		lon = currentValue['Location']['lon'];
	}

	locField.map.initialize(lat,lon);

	locField.map.element.addClass("borderedMap");


	locField.selectLocationButton = $("<button />").addClass("mino_button")
	.text("Search for Location")
	.css("margin-top","5px")
	.on('tap',function(){
		new MapModal(locField,function(address,lat,lon){

		});
	})
	.appendTo(locField.element);
}

LocationField.prototype.updateView = function(){
	var locField = this;

	var currentValue = locField.field.getValue();
	if(currentValue==null || currentValue==""){
		currentValue = {
			"Location" : {
				"lat" : 0.0,
				"lon" : 0.0
			},
			"Address" : ""
		}					
	}

	console.log(currentValue);

	var editing = locField.field.editing();

	locField.map.setDraggableMarker(editing);

	if(locField.addressField!=null){
		locField.addressField.editable = editing;
		locField.addressField.setValue(currentValue['Address']);
	}

	if(locField.distanceFromField){
		locField.minimumDistanceField.editable = editing;
		locField.minimumDistanceField.setValue(currentValue['Minimum Distance']);
		locField.maximumDistanceField.editable = editing;
		locField.maximumDistanceField.setValue(currentValue['Maximum Distance']);
	}

	locField.latitudeField.editable = editing;
	locField.longitudeField.editable = editing;
	locField.latitudeField.setValue(currentValue['Location']['lat']);
	locField.longitudeField.setValue(currentValue['Location']['lon']);


	locField.selectLocationButton.toggle(editing);

	locField.map.setCenter(currentValue['Location']['lat'],currentValue['Location']['lon']);

}

LocationField.prototype.onChange = function(){
	var locField = this;
	var lat = locField.latitudeField.compile();
	var lon = locField.longitudeField.compile();
	if(isNumeric(lat) && isNumeric(lon) && Math.abs(lat)<180 && Math.abs(lon)<180){
		locField.map.setCenter(lat, lon);
	}
}
		
LocationField.prototype.compile = function(){	
	var locField = this;		
	var val = {
		"Location" : {
			"lat" : locField.latitudeField.compile(),
			"lon" : locField.longitudeField.compile()
		}
	};		

	if(locField.distanceFromField){
		var compiledMinimum = locField.minimumDistanceField.compile();
		if(compiledMinimum!=null && compiledMinimum!=""){
			val['Minimum Distance'] = compiledMinimum;
		}

		var compiledMaximum = locField.maximumDistanceField.compile();
		if(compiledMaximum!=null && compiledMinimum!=""){
			val['Maximum Distance'] = compiledMaximum;
		}

		if(compiledMinimum==null && compiledMaximum==null){
			return null;
		}
	} else {
		var compiledAddress = locField.addressField.compile();
		if(compiledAddress!=null && compiledAddress!=""){
			val['Address'] = compiledAddress;
		}
	}
	

	return val;		
}

LocationField.prototype.hideErrors = function(){
	var locField = this;
	if(locField.addressField!=null){
		locField.addressField.hideErrors();
	}
	if(locField.distanceFromField){
		locField.minimumDistanceField.hideErrors();
		locField.maximumDistanceField.hideErrors();
	}

	locField.latitudeField.hideErrors();
	locField.longitudeField.hideErrors();
}
		
LocationField.prototype.error = function(error){
	console.log(error);
	var locField = this;
	
	if(error['Invalid']!=undefined){
		if(error['Invalid']['Location']!=undefined){
			if(error['Invalid']['Location']['Missing']!=undefined){
				if(error['Invalid']['Location']['Missing']['lat']!=undefined){
					locField.latitudeField.error(error['Missing']['Location']['Invalid']['lat']);
				}
				
				if(error['Invalid']['Location']['Missing']['lon']!=undefined){
					locField.longitudeField.error(error['Invalid']['Location']['Invalid']['lon']);
				}
			}
			if(error['Invalid']['Location']['Invalid']!=undefined){
				if(error['Invalid']['Location']['Invalid']['lat']!=undefined){
					locField.latitudeField.error(error['Invalid']['Location']['Invalid']['lat']);
				}
				
				if(error['Invalid']['Location']['Invalid']['lon']!=undefined){
					locField.longitudeField.error(error['Invalid']['Location']['Invalid']['lon']);
				}
			}
		}

		if(error['Invalid']['Minimum Distance']!=undefined){
			locField.minimumDistanceField.error(error['Invalid']['Minimum Distance']);
		}	

		if(error['Invalid']['Maximum Distance']!=undefined){
			locField.maximumDistanceField.error(error['Invalid']['Maximum Distance']);
		}
	}

	if(error['Missing']!=undefined){
		if(error['Missing']['Minimum Distance']!=undefined){
			locField.minimumDistanceField.error(error['Missing']['Minimum Distance']);
		}	

		if(error['Missing']['Maximum Distance']!=undefined){
			locField.maximumDistanceField.error(error['Missing']['Maximum Distance']);
		}
	}
}