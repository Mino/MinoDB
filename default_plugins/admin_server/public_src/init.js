@import("../../../bower_components/jquery/dist/jquery.js");
@import("../../../bower_components/jquery-autosize/jquery.autosize.js");
@import("../../../bower_components/safe/safe.js");
@import("../../../node_modules/fieldval/fieldval.js");
@import("../../../node_modules/fieldval-ui/fieldval-ui.js");
@import("../../../node_modules/fieldval-rules/fieldval-rules.js");
@import("../../../bower_components/extend/extend.js");
@import("../../../errors.js");

@import("common.js");

@import("../../../common_classes/Constants.js");
@import("../../../common_classes/Common.js");
@import("../../../common_classes/Path.js");
@import("../../../common_classes/ID.js");

@import("../../../fieldval_themes/mino_theme.js");

@import("../../../common_elements/common_elements.js");
@import("pages/pages.js");

var page_title_append = "MinoDB";
var body_contents_holder;

$(document).ready(function() {

    SAFE.on_resize = function(resize_obj) {}

    SAFE.element.addClass("page_holder").appendTo("body");

    SAFE.transition_page_callback = function(new_page, old_page) {
        var title = new_page.get_title();
        if (title == null) {
            document.title = page_title_append;
        } else {
            document.title = new_page.get_title() + " - " + page_title_append;
        }

        $('html, body').stop().animate({
            'scrollTop': 0
        }, 500);

        SAFE.element.append(new_page.element);

        //Call resize to make sure the element calculates its height correctly
        SAFE.resize();

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

        /* Returning true tells SAFE that the 
         * transition has been handled. */
        return true;
    }

    SAFE.path = site_path;

    SAFE.debug = false;

    SAFE.init();

});