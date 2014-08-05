extend(HomePage, Page);

function HomePage(req) {
    var page = this;

    HomePage.superConstructor.call(this);

    page.element
    .addClass("home_page")
    .append(
        page.title = $("<div />").addClass("title").text("MinoDB"),
        page.main_content = $("<div />").addClass("main_content").text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec urna tellus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed pellentesque vel velit sed lacinia. Sed mollis sit amet quam eu malesuada. Vestibulum malesuada facilisis augue eget vehicula. Aliquam ultricies enim in purus congue, in mollis sem scelerisque. Etiam blandit vitae leo at gravida. Quisque interdum bibendum mi, vel pharetra purus. Integer in malesuada odio. Mauris volutpat vehicula dui ac placerat. Cras vel urna tortor. Aenean et congue leo, in feugiat est. Mauris vitae nisi in turpis condimentum feugiat sit amet ut magna. Etiam molestie malesuada nunc a accumsan. Nullam ac egestas sapien, nec feugiat dui. Nam consectetur commodo elit, eleifend congue leo."),
        page.login_button = $("<button />").addClass("mino_button").text("Login").on('tap',function(){
            new LoginBox();
        })
    )
}
Site.add_url("/", HomePage);

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