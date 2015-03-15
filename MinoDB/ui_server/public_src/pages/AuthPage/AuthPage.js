extend(AuthPage, Page);

function AuthPage(req) {
    var page = this;

    AuthPage.superConstructor.call(this);

    page.title = null;

    page.form = new FVForm()
    .add_field("username_or_email",new FVTextField("Username or Email*"))
    .add_field("password",new FVPasswordField("Password*"))
    .on_submit(function(object){
        page.login_press(object);
    })
    page.form.element.append(
        $("<button />").addClass("mino_button").text("Login")
    );

    page.element
    .addClass("auth_page")
    .append(
        page.form.element,
        page.loading_overlay = $("<div />").addClass("loading_overlay").hide()
    )

}
Site.add_url("/auth/", AuthPage);

AuthPage.prototype.new_url = function(req) {
    var page = this;

}

AuthPage.prototype.login_press = function(object) {
    var page = this;

    page.form.disable();
    page.form.clear_errors();

    page.loading_overlay.show();

    ajax_request("login",object,function(err, response){
        if(err){
            page.loading_overlay.hide();
            page.form.enable();
        } else {
            page.loading_overlay.hide();
            page.form.enable();
            if (response.success == true) {
                user = response.user;
                header.check_login();
                if(page.on_sign_in_url){
                    Site.load_url(page.on_sign_in_url, true);
                } else {
                    Site.reload_page();
                }
            } else {
                page.form.error(response);
            }
        }
    })
};

AuthPage.prototype.get_title = function() {
    var page = this;

    return "Authenticate";
}

AuthPage.prototype.init = function() {
    var page = this;

}

AuthPage.prototype.remove = function() {
    var page = this;
}

AuthPage.prototype.resize = function(resize_obj) {
    var page = this;

}