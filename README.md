MinoDB
======

MinoDB is an extensible database layer for web apps. MinoDB is for startups and projects that need the freedom of MongoDB combined with an intuitive interface designed for both developers and non-developers. It’s modular and designed to be extended with plugins - both your own and from third-parties.

Installation
=====
Install via NPM
```
npm install MarcusLongmuir/MinoDB
```

Example usage
======
```javascript
var express = require('express');
var MinoDB = require('minodb');
var crypto = require('crypto');

//Create an express server
var server = express();

//Create a MinoDB instance with the mongodb address
var mino = new MinoDB({
    db_address: 'mongodb://127.0.0.1:27017/minodb'
});

var exampleuser_password = crypto.randomBytes(16).toString('hex');

//Create a user
mino.create_user({
    "username": "exampleuser",
    "email": "user@example.com",
    "password": exampleuser_password
}, function(err, res){
    console.log(err, res);
    if(err){
        console.log("exampleuser already exists");
    } else {
        console.log("exampleuser password: "+exampleuser_password);
    }
});

//Attach the MinoDB server to an endpoint
server.use('/mino/', mino.server())

//Start the express server listening in port 5001
server.listen(5001);
```

You also need [MongoDB](http://www.mongodb.org/) for running the example.


Documentation
======
##General concepts

###Paths
###Types
###Objects
###Items
###Folders

##MinoDB

###add_plugin()

###add_field_type()

###server()

###internal_server()

###get_plugin_scripts()

###call()

###get()

###save()

###save_type()

###create_user()

###search()

##Plugins
MinoDB is designed to be extended with plugins. In fact, most of the core functionality is implemented as distinct plugins, which are added by default. Default plugins include:
* AdminServer - server used for plugin configuration
* ApiServer - server that exposes MinoDB calls as an API
* BrowserServer - server that is used for viewing and modifying the data

###Mino plugins
* [MinoVal](https://github.com/MarcusLongmuir/MinoVal)
* [MinoCMS](https://github.com/bestan/MinoCMS)

###Custom plugins
Custom plugin is an object that implements following methods:

####get_config_server()
Should return an express server that is used for configuriation of the plugin. Its content is served by AdminServer plugin.

####info()
Should return an object with plugin information, i.e.
```javascript
BrowserServer.prototype.info = function(){
    var bs = this;

    return {
        name: "browser",
        display_name: "Browser"
    };
}
```

####init(minodb)
Should initialise the pluign. First argument is an instance of MinoDB. It is common to store minodb instance for future use and mount any additoinal servers if necessary. For example:
```javascript
BrowserServer.prototype.init = function(minodb){
    var bs = this;

    bs.minodb = minodb;
    minodb.internal_server().use(bs.path, bs.express_server);
}
```
If MinoDB was mounted under ```/mino/``` (i.e. ```server.use('/mino/', mino.server())```) and ```bs.path = 'browser'```, then URL of the mounted plugin server ```bs.express_server``` will be ```/mino/browser/```

##Signals

##Examples

