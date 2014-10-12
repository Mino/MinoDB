@import("SideMenu/SideMenu.js");

extend(AdminPage, Page);
function AdminPage(req) {
    var page = this;

    console.log(req);

    AdminPage.superConstructor.call(this);

    page.side_menu = new SideMenu(page);

    page.element.addClass("admin_page").append(
        page.logo = $("<a />",{href:Site.path+"admin/"})
        .ajax_url()
        .addClass("logo")
        .text("MinoDB")
    ,
        page.side_menu.element
    ,
        page.content_pane = $("<div/>").addClass("content_pane").append(
            page.main_menu = $("<div />").addClass("main_menu").text("Main Menu")
        )
    )

    for(var i = 0; i < plugins.length; i++){
        var plugin_info = plugins[i];

        page.side_menu.add_item(
            plugin_info.name,
            plugin_info.display_name || plugin_info.name
        );
    }

    page.new_url(req);
}
Site.add_url("/admin/", AdminPage);
Site.add_url("/admin/plugins/", AdminPage);
Site.add_url("/admin/plugins/:plugin_name", AdminPage);

AdminPage.prototype.iframe_load_url = function(url){
    var page = this;

    if(page.iframe!==undefined){
        page.iframe.remove();
    }
    page.iframe = $("<iframe />",{src: url}).appendTo(page.content_pane);
}

AdminPage.prototype.new_url = function(req){
    var page = this;

    if(req.params.plugin_name!==undefined){
        page.iframe_load_url(ui_path+"plugins/"+req.params.plugin_name);
        page.side_menu.select_item(req.params.plugin_name);
        page.main_menu.hide();
    } else {
        if(page.iframe!==undefined){
            page.iframe.hide();
        }
        page.main_menu.show();
        page.side_menu.select_item(null);
    }
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