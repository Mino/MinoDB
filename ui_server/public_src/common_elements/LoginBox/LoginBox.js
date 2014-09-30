function LoginBox(on_sign_in_url){
    var lb = this;

    lb.on_sign_in_url = on_sign_in_url;

    lb.modal = new Modal();
    lb.modal.element.addClass("login_box_modal")

    lb.form = new FVForm()
    .add_field("username_or_email",new TextField("Username or Email*"))
    .add_field("password",new PasswordField("Password*"))
    .on_submit(function(object){
        lb.login_press(object);
    })

    lb.form.element.append(
        $("<button />").addClass("mino_button").text("Login")
    );

    lb.modal.contents.append(
        lb.form.element,
        lb.loading_overlay = $("<div />").addClass("loading_overlay").hide()
    )

    lb.modal.closeCallback = function(){
        lb.on_close();
    }
}

//Overriden
LoginBox.prototype.on_close = function(){}

LoginBox.prototype.login_press = function(object) {
    var lb = this;

    lb.form.disable();
    lb.form.clear_errors();
    lb.modal.reposition();

    lb.loading_overlay.show();

    $.ajax({
        type: "POST",
        url: Site.path + "ajax/login",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(object),
        success: function(response) {
            lb.loading_overlay.hide();
            lb.form.enable();
            if (response.success == true) {
                user = response.user;
                if(response.admin){
                    admin_bar = new AdminBar();
                    admin_bar.element.appendTo("body");
                }
                header.check_login();
                if(lb.on_sign_in_url){
                    Site.load_url(Site.path + lb.on_sign_in_url, true);
                } else if(Site.current_page instanceof HomePage){
                    Site.load_url(Site.path + "my_applications/",true);
                } else {
                    Site.reload_page();
                }
                lb.modal.close();
            } else {
                lb.form.error(response);
                lb.modal.reposition();
            }
        },
        error: function(err, response) {
            lb.loading_overlay.hide();
            lb.form.enable();
        }
    })
};