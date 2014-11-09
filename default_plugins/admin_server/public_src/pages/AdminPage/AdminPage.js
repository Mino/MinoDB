@import("SideMenu/SideMenu.js");

extend(AdminPage, Page);
function AdminPage(req) {
    var page = this;

    AdminPage.superConstructor.call(this);

    page.side_menu = new SideMenu(page);

    page.element.addClass("admin_page").append(
        page.content_pane = $("<div/>").addClass("content_pane").append(
            page.main_menu = $("<div />").addClass("main_menu").text("Main Menu")
        )
    ,
        page.side_menu.element
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
Site.add_url("/", AdminPage);
Site.add_url("/plugins/", AdminPage);
Site.add_url("/plugins/:plugin_name", AdminPage);

AdminPage.prototype.iframe_load_url = function(url){
    var page = this;

    if(page.iframe!==undefined){
        page.iframe.remove();
    }
    page.iframe = $("<iframe />",{src: url}).appendTo(page.content_pane);
}

AdminPage.prototype.new_url = function(req){
    var page = this;

    page.side_menu.close_if_compact();

    if(req.params.plugin_name!==undefined){
        page.iframe_load_url(site_path+"plugin_config/"+req.params.plugin_name);
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

    page.side_menu.init();
}

AdminPage.prototype.remove = function() {
    var page = this;

    page.side_menu.remove();
}

AdminPage.prototype.compact_mode = function(){
    var page = this;

    page.side_menu.compact_mode();
    page.content_pane.css("left","0px");
}

AdminPage.prototype.normal_mode = function(){
    var page = this;

    page.side_menu.normal_mode();
    page.content_pane.css("left","200px");
}

AdminPage.prototype.resize = function(resize_obj) {
    var page = this;

    if(resize_obj.window_width<700){
        if(page.is_compact!==true){
            page.is_compact = true;
            page.compact_mode();
        }
    } else {
        if(page.is_compact!==false){
            page.is_compact = false;
            page.normal_mode();
        }
    }

}