function CounterField(field,details){	
	var counterField = this;
	counterField.field = field;
	counterField.details = details;

	var inputName = uniqueIncrementer++;

	counterField.object = field.fieldSection.itemView.object;
	counterField.typeName = field.fieldSection.typeName;

	counterField.initialized = false;
	counterField.inputBox = null;
	counterField.element = $("<div />");

	counterField.inputBox = $("<textarea />")
	.prop("title",details.hintText)
	.addClass("minofieldinput")
	.appendTo(counterField.element)
	.on("focus",function(){
		field.onFocus(); 
	})
	
	counterField.buttonDiv = $("<div />")
	.appendTo(counterField.element);
	
	counterField.plus1Button = $("<button />")
	.addClass("mino_button")
	.css("display","inline-block")
	.css("margin","0px")
	.css("margin-right","5px")
	.text("+1")
	.on('tap',function(){
		counterField.modifyCounter(1);
	})
	.appendTo(counterField.buttonDiv);
	
	counterField.minus1Button = $("<button />")
	.addClass("mino_button")
	.css("display","inline-block")
	.css("margin","0px")
	.css("margin-right","5px")
	.text("-1")
	.on('tap',function(){
		counterField.modifyCounter(-1);
	})
	.appendTo(counterField.buttonDiv);
	
	counterField.refreshButton = $("<button />")
	.addClass("mino_button")
	.css("display","inline-block")
	.css("margin","0px")
	.css("margin-right","5px")
	.text("Refresh")
	.on('tap',function(){
		counterField.modifyCounter(0);
	})
	.appendTo(counterField.buttonDiv);


	var setSpan = $("<span />")
	.text("Set ")
	.appendTo(counterField.buttonDiv);

	counterField.setCheckbox = $("<input type=\"checkbox\">")
	.css("margin-right","10px")
	.appendTo(counterField.buttonDiv);
}

CounterField.prototype.modifyCounter = function(change){
	var counterField = this;

	var counterAddress = counterField.object.ID+"."+counterField.typeName+"."+counterField.field.name;

	var request = {
		"Function" : "Counter",
		"Parameters" : {
			"Counters" : {}
		}
	};

	request['Parameters']['Counters'][counterAddress] = change;

	var thisRequest = $.ajax({
		type: 'POST',
		url: ajaxAddress,
		data: {'json' : JSON.stringify(request)},
		cache: false,
		success: function(returnedData) {
			var returnedJSON=null;
			try{
				returnedJSON=JSON.parse(returnedData);
			} catch(e){
				alert(JSON.stringify(returnedData));
			}

			var returnedValue = returnedJSON['Counters'][counterAddress];

			counterField.inputBox.val(returnedValue);
				
		},
		error: function(){

		}
	});
}

CounterField.prototype.updateView = function(){	
	var counterField = this;
	var field = counterField.field;
	var details = counterField.details;
	
	if(counterField.initialized==false){
		counterField.initialized = true;
		$(counterField.inputBox).autoResize({
		    maxHeight: 400,
		    minHeight: 0,
		    extraSpace: 0
		})
		setTimeout(function(){
			$(counterField.inputBox).hint();
		}, 1);
	}
	
	var currentValue = field.getValue();
	if(currentValue!=null && currentValue['Set']!=undefined){
		currentValue = currentValue['Set'];
	}
	$(counterField.inputBox).val(currentValue);

	if(field.editing()==true){
		$(counterField.buttonDiv).show();

		$(counterField.inputBox)
		.addClass("minofieldinput")
		.removeClass("minofieldvalue")
		.prop("readonly",null)
		.prop("disabled",null)
		.trigger('keyup');


	} else {
		$(counterField.buttonDiv).hide();

		$(counterField.inputBox)
		.removeClass("minofieldinput")
		.addClass("minofieldvalue")
		.prop("readonly","readonly")
		.prop("disabled","disabled")
		.trigger('keyup');
	}

	if(counterField.object[counterField.typeName]==undefined){
		$(counterField.plus1Button).hide();
		$(counterField.minus1Button).hide();
		$(counterField.refreshButton).hide();
	} else {
		$(counterField.plus1Button).show();
		$(counterField.minus1Button).show();
		$(counterField.refreshButton).show();
	}
}

CounterField.prototype.compile = function(){	
	var counterField = this;

	if($(counterField.setCheckbox).is(":checked")){
		return {
			"Set" : $(counterField.inputBox).val()
		};
	} else {
		return $(counterField.inputBox).val();
	}

}