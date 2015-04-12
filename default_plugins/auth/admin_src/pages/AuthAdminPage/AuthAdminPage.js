extend(AuthAdminPage, Page);

function AuthAdminPage(req) {
    var page = this;

    AuthAdminPage.superConstructor.call(this);

    page.element
    .addClass("auth_admin_page")
    .append(
        page.form_holder = $("<div />")
    )

    ajax_request("get_config",{},function(err,res){
        page.populate(res);
    })

    page.new_url(req);
}
Site.add_url("/", AuthAdminPage);

AuthAdminPage.prototype.populate = function(data){
    var page = this;

    if(page.form){
        page.form.remove();
    }

    page.form = new FVForm();
    page.form.add_field("name", new FVTextField("Name"));
    page.form.add_field("display_name", new FVTextField("Display Name"));

    page.form_holder.append(
        page.form.element
    )

    page.form.val(data).disable();
}

AuthAdminPage.prototype.get_title = function() {
    var page = this;
    return null;
}

AuthAdminPage.prototype.init = function() {
    var page = this;

}

AuthAdminPage.prototype.remove = function() {
    var page = this;

}

AuthAdminPage.prototype.resize = function(resize_obj) {
    var page = this;

}