extend(SignOutPage, Page);

function SignOutPage(req) {
    var page = this;

    SignOutPage.superConstructor.call(this);

    page.element
    .addClass("sign_out_page")
    .append(
        $("<div/>").text(JSON.stringify(user))
    )
}
Site.add_url("/sign_out", SignOutPage);

SignOutPage.prototype.redirect = function(){
    var page = this;

    if(!user){
        return Site.path;
    }
}

SignOutPage.prototype.get_title = function() {
    var page = this;
    return null;
}

SignOutPage.prototype.init = function() {
    var page = this;

    user = null;
    setTimeout(function(){
        $.post(Site.path + "ajax/sign_out", {}, function(err, res){
            Site.reload_page();
        },"json");
    },500);
}

SignOutPage.prototype.remove = function() {
    var page = this;

}

SignOutPage.prototype.resize = function(resize_obj) {
    var page = this;
}