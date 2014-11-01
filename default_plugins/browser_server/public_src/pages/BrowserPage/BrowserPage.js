@import("Browser/Browser.js");

extend(BrowserPage, Page);

function BrowserPage(req) {
    var page = this;

    BrowserPage.superConstructor.call(this);

    page.browser = new MainBrowser();

    page.element
    .addClass("browser_page")
    .append(
        page.browser.element
    )

    page.new_url(req);
}
Site.add_url("/", BrowserPage);
Site.add_url("/*", BrowserPage);

BrowserPage.prototype.new_url = function(req){
    var page = this;

    if(req.params['*']){
        page.browser.load(req.params['*'], req.query);
    } else {
        page.browser.load("/"+user.username+"/", req.query);
    }
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