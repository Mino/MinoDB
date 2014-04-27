extend(BaseSearchField, Field);
function BaseSearchField(details, searchPane, useNesting){
	var field = this;
	field.searchPane = searchPane;
	var newDetails = JSON.parse(JSON.stringify(details));
	if(useNesting){
		newDetails['Search'] = true;
	}
	BaseSearchField.superConstructor.call(this, newDetails);
}

BaseSearchField.prototype.getValue = function(){
	var field = this;
	var searchPane = field.searchPane;

	return searchPane.search[field.name];
}

BaseSearchField.prototype.editing = function(){
	return true;
}

extend(SearchField, Field);
function SearchField(details, fieldSection){
	var field = this;
	field.fieldSection = fieldSection;
	SearchField.superConstructor.call(this, details);
}

SearchField.prototype.getValue = function(){
	var field = this;

	return null;
}

SearchField.prototype.editing = function(){
	var field = this;
	return true;
}

SearchField.prototype.createElement = function(){
	var field = this;

	field.valueField.addClass("searchField");

	field.input = new SearchInput(field, field.inputDetails);
	field.input.element.appendTo(field.valueField);

	field.element = $("<div />")
	.addClass("inputrow");

	field.element.append(
		field.valueTD = $("<div />").append(
			field.searchFieldBox = $("<div />").addClass("searchFieldBox")
			.append(
				field.searchFieldNameRow = $("<div />")
				.addClass("searchFieldNameRow")
				.append(
					field.titleRow = $("<div />")
					.text(field.name)
					.append(
						$("<button />")
						.addClass("mino_button")
						.addClass("plainmino_button")
						.addClass("removemino_button")
						.html("&#215;")
						.tappable(function(){
							field.removePressed();
						})
					)
				)
			)
			.append(
				field.valueField
			)
		)
	)
	
	field.errorElement = $("<div />")
	.addClass("errorrow")
	.append(
		$("<div />")
		.append(
			field.errorTextDiv = $("<div />")
		)
	)
	.hide()
	
	field.spacingElement = $("<div />")
	.addClass("errorSpacingRow")
	.append(
		$("<div />")
	)
	.hide()
	
	if(field.nested){
		field.element.append(
			field.valueTD = $("<div />").append(
				field.removeButton = $("<button />")
				.addClass("mino_button")
				.addClass("redmino_button")
				.addClass("deleteRowButton")
				.text("×").tappable(function(){
					console.log(field.parent);
					field.parent.removeNested(field);
				})
				 .hide()
			)
		);
	}
}

SearchField.prototype.remove = function(){
	var field = this;
}

SearchField.prototype.removePressed = function(){
	var field = this;

	field.removeElement();
	field.fieldSection.removeField(field.name);
}


SearchField.prototype.hideErrors = function(error){
	var field = this;

	field.element.removeClass("error");
	field.valueTD.removeClass("error");
	field.errorElement.removeClass("error").hide();
	field.spacingElement.hide();
	
	field.input.hideErrors();
}

SearchField.prototype.error = function(error){
	var field = this;

	field.element.addClass("error");
	field.valueTD.addClass("error");
	field.errorElement.addClass("error").show();
	field.spacingElement.show();
	field.errorTextDiv.text(compileErrorString(error));

	field.input.error(error);
}

extend(CoreSearchField,SearchField);
function CoreSearchField(details,searchPane){
	var field = this;
	field.searchPane = searchPane;
	CoreSearchField.superConstructor.call(this, details);
}

CoreSearchField.prototype.removePressed = function(){
	var field = this;
	
	field.removeElement();
	field.searchPane.removeCoreField(field.name);
}