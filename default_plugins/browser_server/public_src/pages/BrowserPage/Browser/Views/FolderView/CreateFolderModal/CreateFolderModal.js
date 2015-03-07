function CreateFolderModal(parent_folder, callback){
	var cfm = this;

	cfm.parent_folder = parent_folder;
	cfm.callback = callback;

	var modal = new Modal({
		title: "Create a Folder"
	});

	cfm.element = $("<div />").addClass("create_folder_modal").append(
		modal.element
	)
	cfm.modal = modal;

	cfm.form = new FVForm();
	cfm.form.add_field("name", new FVTextField("Folder Name"))

	modal.contents.append(
		cfm.form.element
	)

	modal.bottom_bar.append(
		$("<button />").addClass("mino_button").text("Create").on('tap',function(event){
			cfm.form.submit();
		})
	)

	cfm.form.on_submit(function(form_value){
		console.log(form_value);
		cfm.create_folder(form_value);
	})
}

CreateFolderModal.prototype.init = function(){
	var cfm = this;

	cfm.form.fields.name.focus();
}

CreateFolderModal.prototype.create_folder = function(form_value){
	var cfm = this;

	api_request({
		"function" : "save",
		"parameters" : {
			"objects" : [
				{
					"name": form_value.name,
					"folder": true,
					"path": cfm.parent_folder.toString()
				}
			]
		}
	},function(err, response){
		console.log("err ",err);
		console.log("response ",response);

		if(err){
			alert("API error");
			return;
		}

		if(response.invalid){
			cfm.form.error(response.invalid.parameters.invalid.objects.invalid[0]);
		}
		if(response.objects){
			var object_response = response.objects[0];
			if(object_response.invalid){
				object_response.invalid.name = object_response.invalid.full_path;
			}

			if(object_response.error){
				cfm.form.error(object_response);
			} else {
				cfm.modal.close();
				cfm.callback(null, object_response);
			}
		}
	})
}