function LoginBox() {
    var lb = this;

    var posted_username = "Inserted username";
    var posted_email = "Inserted email";
    var auth_mode = 'new';

    // lb.logo = new Logo();

    lb.element = $("<div />").addClass("login_box")
        .append(
            lb.user_message_area = $('<div />')
            .addClass("user_message_area")
            .text("user_message_area")
            .hide()
    )
        .append(
            lb.logo_header = $("<div />").addClass("logo_header")
            // .append(
            //     lb.logo.element.addClass("dark logo52")
            // )
            .append(
                lb.login_box_title = $("<a />")
                .attr("href", "/")
                .ajax_url()
                .addClass("login_box_title")
                .text("MinoCloud")
            )
    )
        .append(
            $("<div />").addClass("auth_mode_option_area")
            .append(
                $("<label />")
                .append(
                    lb.existing_user_radio = $('<input type="radio" /">')
                    .attr("name", "auth_mode")
                    .attr("value", "existing")
                    .on("change", function() {
                        lb.switch_mode(true);
                    })
                )
                .append(
                    $("<span />").text("Existing user")
                )
            )
            .append(
                $("<label />")
                .append(
                    lb.new_user_radio = $('<input type="radio" /">')
                    .attr("name", "auth_mode")
                    .attr("value", "new")
                    .on("change", function() {
                        lb.switch_mode(true);
                    })
                )
                .append(
                    $("<span />").text("New user")
                )
            )
            .append(
                $("<label />")
                .append(
                    lb.forgot_radio = $('<input type="radio" /">')
                    .attr("name", "auth_mode")
                    .attr("value", "forgot")
                    .on("change", function() {
                        lb.switch_mode(true);
                    })
                )
                .append(
                    $("<span />").text("Forgot")
                )
            )
    )
        .append(
            lb.username_input = $('<input type="text" >')
            .addClass("login_form_field dark_border")
            .attr("autocomplete", "off")
            .attr("spellcheck", "false")
            .attr("name", "username")
            .attr("title", "Username")
            .val(posted_username)
            // .hint()
    )
        .append(
            lb.username_error = $('<div />')
            .addClass("auth_field_error")
            .text("username_error")
            .hide()
    )
        .append(
            lb.email_input = $('<input type="email" />')
            .addClass("login_form_field dark_border")
            .attr("autocomplete", "off")
            .attr("name", "email")
            .attr("title", "Email")
            .val(posted_email)
            // .hint()
    )
        .append(
            lb.email_error = $('<div />')
            .addClass("auth_field_error")
            .text("email_error")
            .hide()
    )
        .append(
            lb.password_input = $('<input type="password" />')
            .addClass("login_form_field dark_border")
            .attr("autocomplete", "off")
            .attr("name", "password")
            .attr("title", "Password")
            // .hint()
    )
        .append(
            lb.password_error = $('<div />')
            .addClass("auth_field_error")
            .text("password_error")
            .hide()
    )
        .append(
            $("<div />")
            .addClass("buttons")
            .append(
                $("<a />")
                .addClass("form_double_button")
                .append(
                    $("<button />")
                    .addClass("mino_button left_button")
                    .text("Back (broken)")
                )
            )
            .append(
                $("<div />")
                .addClass("form_double_button")
                .append(
                    lb.confirm_button = $('<button type="submit" />')
                    .addClass("mino_button minoGreenButton right_button")
                    .text("Sign Up")
                    .tappable(function() {
                        lb.confirm_press();
                    })
                )
            )
    )

    lb.redirect = null;
    lb.animate_time = 300;

    if (auth_mode == 'new') {
        lb.existing_user_radio.attr(
            "checked", null
        );
        lb.forgot_radio.attr(
            "checked", null
        );
        lb.new_user_radio.attr(
            "checked", "checked"
        );
    } else if (auth_mode == 'existing') {
        lb.new_user_radio.attr(
            "checked", null
        );
        lb.forgot_radio.attr(
            "checked", null
        );
        lb.existing_user_radio.attr(
            "checked", "checked"
        );
    } else {
        lb.new_user_radio.attr(
            "checked", null
        );
        lb.existing_user_radio.attr(
            "checked", null
        );
        lb.forgot_radio.attr(
            "checked", "checked"
        );
    }

    lb.switch_mode(false);

    lb.reposition_box();
}

LoginBox.prototype.confirm_press = function() {
    var lb = this;

    MinoCloud_api(
        'http://minocloud.com/auth/api',
        'Sign In', {
            'Username': 'MarkDoe',
            'Password': 'ulhatuuohfihasf'
        },
        function(response) {
            console.log(response);
        },
        function(error) {
            alert(JSON.stringify(error));
            console.log(error);
        }
    );
}

LoginBox.prototype.update_redirect = function(app_data) {
    var lb = this;

    lb.redirect = new RedirectOption(
        "FALSE NAME",
        app_data,
        "signup",
        function() {
            lb.redirect.element.fadeOut(function() {
                lb.redirect.element.remove();
            });
            lb.redirect.element.css("position", "absolute");
            lb.reposition_box(true);
        }
    );
    lb.redirect.element.appendTo(lb.element);
}

LoginBox.prototype.switch_mode = function(animate) {
    var lb = this;

    var auth_mode = $('input[name=auth_mode]:checked').val()

    if (auth_mode == 'new') {
        lb.email_input
            .slideDown(lb.animate_time)
            .fadeIn(lb.animate_time);

        lb.password_input
            .slideDown(lb.animate_time, function() {
                lb.reposition_box(animate);
            })
            .fadeIn(lb.animate_time);

        lb.username_input.attr("title", "Username")//.hint();

        lb.confirm_button.text("Sign Up");

        if (lb.redirect != null) {
            lb.redirect.update_mode("new");
        }
    } else if (auth_mode == 'existing') {

        lb.email_input
            .slideUp(lb.animate_time)
            .fadeOut(lb.animate_time);

        lb.password_input
            .slideDown(lb.animate_time)
            .fadeIn(lb.animate_time);

        lb.username_input.attr("title", "Username or Email")//.hint();

        lb.confirm_button.text("Sign In");

        if (lb.redirect != null) {
            lb.redirect.update_mode("existing");
        }
    } else {
        lb.email_input
            .slideUp(lb.animate_time)
            .fadeOut(lb.animate_time);

        lb.password_input
            .slideUp(lb.animate_time)
            .fadeOut(lb.animate_time);

        lb.username_input.attr("title", "Username or Email")//.hint();

        lb.confirm_button.text("Reset Password");

        /*loginBoxTitle.text("Forgot");
			logoHeader
			.animate({
				"left":"0px"
			},lb.animate_time);*/

        if (lb.redirect != null) {
            lb.redirect.update_mode("existing");
        }
    }

    if (animate) {
        lb.hide_errors();
    }
}

LoginBox.prototype.reposition_box = function(animate) {
    var lb = this;

    if (animate != undefined && animate) {
        lb.element.animate({
            "margin-top": -(lb.element.height() / 2) + "px"
        });
    } else {
        lb.element.css("margin-top", -(lb.element.height() / 2) + "px");
    }
}

LoginBox.prototype.hide_errors = function() {
    var lb = this;

    lb.username_error.slideUp(lb.animate_time);
    lb.email_error.slideUp(lb.animate_time);
    lb.password_error.slideUp(lb.animate_time);
    lb.user_message_area.slideUp(lb.animate_time);
}