SAFE.extend(NotFoundPage, Page);

function NotFoundPage(parameters, url) {
    var page = this;

    NotFoundPage.superConstructor.call(this);

    page.element.addClass("not_found_page").append(
        $("<div />")
        .text("404 - Page not found")
    )
}
//No urls - only accessible when used as a 404 page

NotFoundPage.prototype.get_title = function() {
    var page = this;
    return "Page Not Found";
}

NotFoundPage.prototype.init = function() {
    var page = this;

}

NotFoundPage.prototype.remove = function() {
    var page = this;

}

NotFoundPage.prototype.resize = function(resize_obj) {
    var page = this;

}