@import("Browser/Browser.js");

extend(BrowserPage, Page);

function BrowserPage(parameters, url) {
    var page = this;

    BrowserPage.superConstructor.call(this);

    page.browser = new MainBrowser();

    page.element
    .addClass("browser_page")
    .append(
        page.browser.element
    )
}
Site.add_url("/browser/", BrowserPage);
Site.add_url("/browser/*", BrowserPage);

BrowserPage.prototype.new_url = function(parameters, url, wildcard){
    var page = this;

    
}

BrowserPage.prototype.get_title = function() {
    var page = this;
    return null;
}

BrowserPage.prototype.init = function() {
    var page = this;

}

BrowserPage.prototype.remove = function() {
    var page = this;

}

BrowserPage.prototype.resize = function(resize_obj) {
    var page = this;

    page.browser.resize(resize_obj);
}