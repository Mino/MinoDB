extend(HomePage, Page);

function HomePage(req) {
    var page = this;

    HomePage.superConstructor.call(this);

    page.title = null;

    page.form = new FVForm()
    .add_field("username_or_email",new TextField("Username or Email*"))
    .add_field("password",new PasswordField("Password*"))
    .on_submit(function(object){
        page.login_press(object);
    })
    page.form.element.append(
        $("<button />").addClass("mino_button").text("Login")
    );

    page.element
    .addClass("home_page")
    .append(
        page.form.element,
        page.loading_overlay = $("<div />").addClass("loading_overlay").hide()
    )

}
Site.add_url("/", HomePage);

HomePage.prototype.redirect = function(req){
    var page = this;

    if(user){
        if(req.query.redirect){
            window.location = req.query.redirect;
        } else {
            window.location = "/mino/admin/";
        }
    }
}

HomePage.prototype.login_press = function(object) {
    var page = this;

    page.form.disable();
    page.form.clear_errors();

    page.loading_overlay.show();

    ajax_request("login",object,function(err, response){
        console.log("Login ",err, response);
        if(err){
            page.loading_overlay.hide();
            page.form.enable();
        } else {
            page.loading_overlay.hide();
            page.form.enable();
            if (response.success == true) {
                user = response.user;
                Site.reload_page();
            } else {
                page.form.error(response);
            }
        }
    })
};

HomePage.prototype.get_title = function() {
    var page = this;

    return "Authenticate";
}

HomePage.prototype.init = function() {
    var page = this;

}

HomePage.prototype.remove = function() {
    var page = this;
}

HomePage.prototype.resize = function(resize_obj) {
    var page = this;

}