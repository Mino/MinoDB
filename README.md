MinoDB
======

MinoDB is an extensible database layer for web apps. Utilizing [MongoDB](http://www.mongodb.org/)'s freedom, MinoDB adds well-designed structure - providing power of building apps extremely faster.

Main features:
* Familiar folder structure - easy to organise and view your data.
* Reusable database schema. Create forms and validate JSON objects with a few lines of code.
* UI for your data - an admin interface that your non-technical colleagues can use without having to building one from scratch.
* Users and permissions out of the box
* Plugins - customise and add functionality with plugins. Building one is as easy as building an express app.
* Signals - listen to data changes within a folder. Extremely useful for integrating with Slack, Trello, Zapier and others.

MinoDB is for startups and developers who need to build high quality web apps extremely fast. It doesn't get in your way - it's completely up to you to structure your code. When MinoDB APIs aren't good enough - you can call MongoDB in any way you're used too.

Use cases:
* Primary data storage
* Secondary data storage (i.e. CMS)

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

[Other examples](#examples).

Documentation
======
##General concepts

###Objects
Both the [items](#items) that store data and the [folders](#folders) that create hierarchy are objects.

Every object has the following fields:
* _id - The ID of the object.
* name - The name of the object. It must be unique to the object's path.
* path - The [path](#paths) of the object. It is the ```full_path``` of the parent [folders](#folders).
* folder - A boolean indicating whether or not the object is a [folder](#folders).

###Items
Items are [objects](#objects) and as such have an ```_id```, ```name``` and ```path```. Their ```folder``` key is set to false.

Items are used to hold data defined by [types](#types). 

###Folders
Folders are used to organize your data. Creating a folder with the full path ```/my_app/orders/``` allows you to save other [objects](#objects) into this path (e.g. ```/my_app/orders/order_1234```).

Folders are [objects](#objects) and as such have an ```_id```, ```name``` and ```path```. Their ```folder``` value is set to true.

Folders can contain both other folders and [items](#items). Unlike [items](#items), folders cannot be used to store data using [types](#types).

###Paths
Paths are built from the forward-slash (```/```) delimited [folder](#folders) names of an [object](objects)'s ancestors.

A ```full_path``` is the concatenation (joining) of the ```path``` and the ```name``` of the [object](objects). An example is shown below using an [item](#items) named ```John Smith```:

```javascript
{
    "name" : "John Smith",
    "path" : "/my_app/people/",
    "full_path" : "/my_app/people/John Smith"
    ...
}
```

###Types
Type defines a JSON schema for the data that is stored by [item](#items). Each [item](#items) can contain several types.

[Item](#items) implementing a type will have type's name as a key that stores type's data. For example, if name of the type is ```custom_type```, then an item would look like this:
```javascript
{
    "_id": 123,
    "name" : "Some item",
    "path" : "/my_app/",
    "full_path" : "/my_app/Some item",
    "folder": false,
    "custom_type": <CUSTOM_TYPE_DATA>
}
```

Types are powered by [fieldval-rules](https://github.com/FieldVal/fieldval-rules-js).

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
MinoDB is designed to be extended with plugins. In fact, most of the out-of-the-box functionality is implemented as distinct plugins, which are added by default. Default plugins include:
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
* [Mino Calendar example](https://github.com/bestan/mino-calendar-example)
* [Mino CMS example](https://github.com/bestan/mino-cms-example)
