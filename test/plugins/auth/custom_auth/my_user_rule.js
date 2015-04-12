var my_user_rule = {
    "name": "my_user",
    "display_name": "my_user",
    "type": "object",
    "fields": [
        {
            "name": "my_username",
            "display_name": "my_username",
            "type": "text",
            "min_length": 2,
            "ui_type": "text"
        },
        {
            "name": "my_password",
            "display_name": "my_password",
            "type": "string",
            "min_length": 4,
            "ui_type": "password"
        }
    ]
}

module.exports = my_user_rule;
