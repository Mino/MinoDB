@import("Feature/Feature.js");

extend(HomePage, Page);

function HomePage(parameters, url) {
    var page = this;

    HomePage.superConstructor.call(this);

    page.stacked = false;

    page.element
        .addClass("home_page")
        .append(
            $("<div />").addClass("body_text")
            .append(
                $("<div />").addClass("body_headline").text("HEADLINE")
            )
    )
        .append(
            page.sign_up_area = $("<div />").addClass("signup_area")
            .append(
                $("<span />").text("SIGN UP MESSAGE")
            )
            .append(
                $("<a />")
                .attr("href", "/auth/?appName=MinoCloud&appRedirect=http://minocloud.com/docs/?Quick_Start_Tutorial")
                .ajax_url()
                .append(
                    $("<button />").addClass("mino_button big_signup_button").text("Sign Up")
                )
            )
    )
        .append(
            page.feature_stack = $("<div />").addClass("feature_stack")
    )


    var features_data = [{
        "title": "Concentrate on features and design.",
        "text": "MinoCloud™ solves the problems that you wish you didn't have to. You want to concentrate on creating great features and usable designs, not writing generic architecture. We've got you covered.",
        "image_ref": "featuresdesignimg"
    }, {
        "title": "Store your structured data properly.",
        "text": "MinoCloud™ uses an innovative JSON structure to provide validation of your data, whilst allowing flexible, extendable items. ",
        "image_ref": "structuredimg"
    }, {
        "title": "An easy-to-use visual interface",
        "text": "MinoCloud™ has an easy-to-use visual interface that allows you to search the data your app uses, but also lets you prototype new data structures. It's a powerful tool.",
        "image_ref": "browserapiimg"
    }, {
        "title": "Notifications are powerful, not painful.",
        "text": "You can update your app's content, alert your users with a description or both at the same time. One simple API request and your notification is delivered all the way to your app's front-end, to multiple devices, with scripted merging and conditional alerts. It's versatile and powerful.",
        "image_ref": "notificationsimg"
    }, {
        "title": "Authentication? 1 line of code.",
        "text": "Implementing authentication can take up plenty of time. You won't have to worry about that. We take care of your end-user authentication so it's just one line of code to attempt authentication and then you choose how to react.	",
        "image_ref": "authimg"
    }, {
        "title": "Build apps with PHP or Node.js",
        "text": "MinoCloud™ currently has library support for PHP and Node.js. You can follow the <a href='http://minocloud.com/docs/?Quick App Tutorial (PHP)''>tutorial for PHP here</a> and the <a href='http://minocloud.com/docs/?Quick App Tutorial (Node)'>tutorial for Node.js here</a>.",
        "image_ref": "languagesimg"
    }];

    page.features = [];

    page.feature_stack.append(
        $("<div />").addClass("feature_divide")
    )

    for (var i in features_data) {
        var feature_data = features_data[i];

        var feature = new Feature(feature_data, i % 2 == 0);
        page.features.push(feature);

        page.feature_stack.append(
            feature.element
            ,
            $("<div />").addClass("feature_divide")
        )
    }

}
Site.add_url(ui_path, HomePage);

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
    //page.stats_element.text("Document width: "+resize_obj.doc_width + " Document height: "+resize_obj.doc_height);

    for (var i in page.features) {
        var feature = page.features[i];
        feature.resize(resize_obj);
    }

}