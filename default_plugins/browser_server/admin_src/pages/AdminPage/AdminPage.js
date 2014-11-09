extend(AdminPage, Page);

function AdminPage(req) {
    var page = this;

    AdminPage.superConstructor.call(this);

    page.element
    .addClass("admin_page")
    .append(
        page.form_holder = $("<div />")
    )

    ajax_request("get_config",{

    },function(err,res){
        page.populate(res);
    })

    page.new_url(req);
}
Site.add_url("/", AdminPage);

AdminPage.prototype.populate = function(data){
    var page = this;

    if(page.form){
        page.form.remove();
    }

    page.form = new FVForm();
    page.form.add_field("name", new TextField("Name"));
    page.form.add_field("display_name", new TextField("Display Name"));

    page.form_holder.append(
        page.form.element
    )

    page.form.val(data).disable();
}

AdminPage.prototype.get_title = function() {
    var page = this;
    return null;
}

AdminPage.prototype.init = function() {
    var page = this;

}

AdminPage.prototype.remove = function() {
    var page = this;

}

AdminPage.prototype.resize = function(resize_obj) {
    var page = this;

}