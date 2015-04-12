@import("../../../bower_components/jquery/dist/jquery.js");
@import("../../../bower_components/safe/safe.js");
@import("../../../node_modules/fieldval/fieldval.js");
@import("../../../node_modules/fieldval-ui/fieldval-ui.js");
@import("../../../node_modules/fieldval-rules/fieldval-rules.js");
@import("../../../bower_components/extend/extend.js");
@import("../../../errors.js");

@import("../../../common_classes/Constants.js");
@import("../../../common_classes/Common.js");
@import("../../../common_classes/Path.js");
@import("../../../common_classes/ID.js");

@import("../../../fieldval_themes/mino_theme.js");

@import("../../common/common.js");

@import("../../../common_elements/common_elements.js");
@import("pages/pages.js");

var page_title_append = "MinoDB";
var body_contents_holder;

$(document).ready(function() {

    Site.on_resize = function(resize_obj) {}

    Site.element.addClass("page_holder").appendTo("body");

    Site.path = site_path;
    Site.init();
});