@import("../../bower_components/jquery/dist/jquery.js");
@import("../../bower_components/jquery.autoresize/jquery.autoresize.js");
@import("../../bower_components/safe/safe.min.js");
@import("../../bower_components/fieldval/fieldval.js");
@import("../../bower_components/fieldval-basicval/fieldval-basicval.js");
@import("../../bower_components/fieldval-ui/fieldval-ui.js");
@import("../../extend.js");

@import("common.js");

@import("../../common_classes/Constants.js");
@import("../../common_classes/Path.js");

@import("fieldval_themes/mino_theme.js");

@import("CommonElements/CommonElements.js");
@import("Pages/Pages.js");

var page_title_append = "MinoDB";
var body_contents_holder;
// var header;
// var footer;

$(document).ready(function() {

    Site.on_resize = function(resize_obj) {

        // resize_obj.body_width = body_contents_holder.contents.width();
        // resize_obj.proportion = resize_obj.body_width / max_width;
        // if (resize_obj.proportion > 1.0) {
        //     resize_obj.proportion = 1.0;
        // }

        // body_contents_holder.resize(resize_obj);

        // header.resize(resize_obj);
    }

    // header = new Header();
    // header.element.appendTo("body");

    Site.element.addClass("page_holder").appendTo("body");

    // footer = new Footer();
    // footer.element.appendTo(body_contents_holder.contents);

    Site.transition_page_callback = function(new_page, old_page) {
        var title = new_page.get_title();
        if (title == null) {
            document.title = page_title_append;
        } else {
            document.title = new_page.get_title() + " - " + page_title_append;
        }

        $('html, body').stop().animate({
            'scrollTop': 0
        }, 500);

        Site.element.append(new_page.element);

        //Call resize to make sure the element calculates its height correctly
        Site.resize();

        if (old_page != null) {
            old_page.element.css({
                "width": old_page.element.width(),
                "height": old_page.element.height(),
                "position": "absolute"
            })
                .fadeOut(500, function() {
                    old_page.element.remove();
                })

            new_page.element.hide().fadeIn(500);
        }

        /* Returning true tells the framework that the 
         * transition has been handled. */
        return true;
    }

    Site.path = ui_path;

    Site.debug = false;

    Site.set_no_page_found_class(NotFoundPage);

    Site.init();

});