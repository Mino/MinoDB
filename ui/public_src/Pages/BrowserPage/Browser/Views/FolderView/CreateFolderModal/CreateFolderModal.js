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
	cfm.form.add_field("folder_name", new TextField("Folder Name"))

	modal.contents.append(
		cfm.form.element
	)

	modal.bottom_bar.append(
		$("<button />").addClass("mino_button").text("Create").on('tap',function(event){
			cfm.form.submit();
		})
	)

	cfm.form.on_submit(function(object){
		console.log(object);
		cfm.create_folder(object);
	})
}

CreateFolderModal.prototype.create_folder = function(object){
	var cfm = this;

	ajax_request({
		"function" : "save",
		"parameters" : {
			"objects" : [
				{
					"name": object.folder_name,
					"folder": true,
					"path": cfm.parent_folder.toString()
				}
			]
		}
	},function(err, response){
		console.log("err ",err);
		console.log("response ",response);
	})
}