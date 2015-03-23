extend(HomePage, Page);

function HomePage(req) {
    var page = this;

    HomePage.superConstructor.call(this);

    page.title = null;

    var username_field = new FVTextField("Username or Email*");

    username_field.input.attr({
        "autocapitalize": "off",
        "autocorrect": "off"
    })

    page.form = new FVForm()
    .add_field("username_or_email",username_field)
    .add_field("password",new FVPasswordField("Password*"))
    .on_submit(function(object){
        page.login_press(object);
    })
    page.form.element.append(
        $("<button />").addClass("mino_button").text("Sign in")
    );

    page.element
    .addClass("home_page")
    .append(
        $("<div />").addClass("header").append(
            $("<div />").addClass("brand_name").text("MinoDB")
        ),
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
            window.location = Site.path+"admin/";
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