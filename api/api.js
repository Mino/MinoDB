var api = {};

var test_user = {
    "username": "TestUser",
    "api_key": "TEST123fmafo4agnlanq23"
}

var api = {}

api.get_user_by_username = function(username, callback) {
    callback(null, test_user);
}

module.exports = api;