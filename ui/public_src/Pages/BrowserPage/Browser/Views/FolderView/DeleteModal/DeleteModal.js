function DeleteModal(icon_list, callback){
	var dm = this;

	dm.icon_list = icon_list;
	dm.callback = callback;

	var modal = new Modal({
		title: "Delete Objects"
	});

	dm.element = $("<div />").addClass("delete_modal").append(
		modal.element
	)
	dm.modal = modal;
	dm.modal.ok_callback = function(){
		dm.perform_delete();
	}

	dm.form = new FVForm();

	dm.list = [];
	dm.name_list = [];

	for(var i = 0; i < icon_list.length; i++){
		var icon = icon_list[i];

		dm.list.push(icon.full_path);
		dm.name_list.push(icon.name);
		dm.form.add_field(i, new TextField(i));
	}

	modal.contents.append(
		dm.form.element
	)

	dm.form.val(dm.name_list);
	dm.form.view_mode();

	modal.bottom_bar.append(
		$("<button />").addClass("mino_button").text("Delete").on('tap',function(event){
			dm.perform_delete();
		})
	)
}

DeleteModal.prototype.perform_delete = function(){
	var dm = this;

	ajax_request({
		"function" : "delete",
		"parameters" : {
			"addresses" : dm.list
		}
	},function(err, response){
		console.log("err ",err);
		console.log("response ",response);

		if(err){
			alert("API error");
			return;
		}

		if(response.invalid){
			dm.form.error(response.invalid.parameters.invalid.objects);
		}
		if(response.objects){
			console.log(response.objects);
		}
	})
}