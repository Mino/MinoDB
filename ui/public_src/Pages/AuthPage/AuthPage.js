

extend(AuthPage, Page);

function AuthPage(parameters, url, wildcard_contents) {
    var page = this;

    AuthPage.superConstructor.call(this);

    page.title = null;

    page.login_box = new LoginBox();

    page.element
        .addClass("auth_page")
        .append(
            page.login_box.element
    )

}
Site.add_url("/auth/", AuthPage);

AuthPage.prototype.new_url = function(parameters, url, wildcard_contents) {
    var page = this;

    //document.title = page.title + " - " + page_title_append;
}

AuthPage.prototype.get_title = function() {
    var page = this;

    return "Authenticate";
}

AuthPage.prototype.init = function() {
    var page = this;

    page.login_box.reposition_box();

    // body_contents_holder.set_transparent(true);
    // header.hide();
    // footer.hide();
}

AuthPage.prototype.remove = function() {
    var page = this;

    // body_contents_holder.set_transparent(false);
    // header.show();
    // footer.show();
}

AuthPage.prototype.resize = function(resize_obj) {
    var page = this;

}