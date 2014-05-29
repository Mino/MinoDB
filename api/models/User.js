User.systemUsers = [
    "Mino",
    "MinoCloud",
    "Notifications",
    "Identity",
    "Messages",
    "Browser",
    "Account",
    "Public"
];

function User(username) {
    this.username = username;

    if (!Common.isValidUsername(username)) {
        throw new ValidatorError(53);
    }

    this.usernameKey = CouchbasePool.toKVUsernameKey(this.username);
}

User.prototype.is_system_user = function(toCheck) {
    for (var systemUser in User.systemUsers) {
        if (systemUser == toCheck) {
            return true;
        }
    }
    return false;
}