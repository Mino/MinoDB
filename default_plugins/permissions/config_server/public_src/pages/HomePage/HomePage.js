SAFE.extend(HomePage, Page);

function HomePage(req) {
    var page = this;

    HomePage.superConstructor.call(this);

    page.element.addClass("home_page").append(
        $("<p/>").text("MinoDBPermissions config server (using SAFE)")
    )

}

HomePage.prototype.get_title = function() {
    var page = this;
    return null;
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