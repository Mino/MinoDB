MinoDB
======

MinoDB is an extensible database layer for web apps. Utilizing [MongoDB](http://www.mongodb.org/)'s freedom, MinoDB adds well-designed structure - allowing you to build apps much faster.

##Table of Contents
* [Main features](#main-features)
* [Installation](#installation)
* [Example usage](#example-usage)
* [Documentation](#documentation)

Main features
======

###Powerful schema validation

MinoDB validates all your objects according to the schema defined either in the code or dynamically in the UI. Validation errors are readable and parseable, i.e.

Schema example:
```javascript
{
    "name": "product",
    "type": "object",
    "fields":[{
        "name": "title",
        "type": "text",
        "min_length": 5,
    },{
        "name": "quantity",
        "type": "number",
        "minimum": 0
    },{
        "name": "date_created",
        "type": "date",
        "format": "yyyy-MM-dd hh:mm:ss"
    }]
}
```

Error example:
```javascript
{
    "invalid": {
        "title": {
            "error": 100,
            "error_message": "Length is less than 5"
        },
        "quantity": {
            "error_message": "Field missing.",
            "error": 1
        },
        "date_created": {
            "error": 111,
            "error_message": "Invalid date format."
        }
    },
    "error_message": "One or more errors.",
    "error": 5
}
```

Schema definition supports implementing custom validation (both sync and async). Check [FieldVal](https://github.com/FieldVal/fieldval-js) and [FieldVal rules](https://github.com/FieldVal/fieldval-rules-js) to learn more about errors and validation.

###UI for your data
MinoDB includes a default Browser plugin for viewing the data.


#####Familiar folder structure, intutiative for both technical and non-technical colleagues. Increadibly easy to view and organise absolutely anything. 
![Folder structure](https://raw.githubusercontent.com/MarcusLongmuir/MinoDB/develop/docs/folder_structure.png)


#####Items are always validated based on the defined schema. It also uses custom rules defined in your backend.
![Item validation](https://raw.githubusercontent.com/MarcusLongmuir/MinoDB/develop/docs/item_validation.png)

###Other features
* Users, authentication and permissions out of the box (work in progress)
* Customise and add functionality with plugins. Writing one is as easy as building an express app.
* Signals - listen to data changes. Extremely useful for integrating with Slack, Trello, Zapier and others.

MinoDB is for startups and developers who need to build high quality web apps extremely fast. It doesn't get in your way - it's completely up to you to structure your code. MinoDB doesn't get in your way - you can still call MongoDB directly in any way you're used too.

###Notice: ALPHA release - use at your own risk.

###Plugins
* [MinoVal](https://github.com/MarcusLongmuir/MinoVal) - validation and form creation with Mino types, custom validation rules and more.
* [MinoCMS](https://github.com/bestan/MinoCMS) - basic CMS functionality. 

###Examples
* [Mino Calendar example](https://github.com/bestan/mino-calendar-example)
* [Mino CMS example](https://github.com/bestan/mino-cms-example)

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

You also need [MongoDB](http://www.mongodb.org/) running locally to run the example.

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

[Item](#items) implementing a type will have type's name as a key that stores the type's data. For example, if name of the type is ```custom_type```, then an item would look like this:
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
```javascript
var mino = new MinoDB(config, [username]);
```

```config``` is a JSON object with following keys:
* ```db_address``` - MongoDB URL (i.e. ```mongodb://127.0.0.1:27017/minodb```)
* ```dynamic_signals_enabled``` - boolean specifying whether dynamic signals should be enabled. Default is ```true```. Read [signals](#signals) for more info.

```username``` specifies which user should be making API calls when running ```call()``` or its helper functions.

###server()
Returns main express server used by MinoDB instance. You should mount this into your express server:

```javascript
server.use('/mino/', mino.server())
```

###call(parameters, callback)
Calls MinoDB API. Parameters should be in the following format:
```javascript
{
    "function": <FUNCTION_NAME>,
    "parameters": <API_CALL_PARAMETERS>
}
```

Available functions:
* get
* save
* delete
* search
* save_type
* delete_type
* add_permissions
* create_user

###get(addresses, callback)
Helper function for the ```get``` API function. ```addresses``` is a list of objects to return.

```javascript
mino.get(['/my_app/item'], callback);
```

```call``` alternative:
```javascript
mino.call({
    "function": "get",
    "parameters": {
        "addresses": addresses
    }
}, callback);
```

###save(objects, callback)
Helper function for the ```save``` API function. ```objects``` is a list of [objects](#objects) to save.

```javascript
mino.save([{
    "name" : "item",
    "path" : "/my_app/",
    "full_path" : "/my_app/item",
    "folder": false
}], callback);
```

```call``` alternative:
```javascript
mino.call({
    "function": "save",
    "parameters": {
        "objects": objects
    }
}, callback);
```

###save_type(type, callback)
Helper function for the ```save_type``` API function. ```type``` is a valid fieldval-rule.

```call``` alternative:
```javascript
mino.call({
    "function": "save_type",
    "parameters": {
        "type": type
    }
}, callback);
```

###create_user(user, callback)
Helper function for the ```create_user``` API function. ```user``` is an object with the following format:
```javascript
{
    "username": <USERNAME>,
    "email": <EMAIL>,
    "password": <PASSWORD>
}
```

```call``` alternative:
```javascript
mino.call({
    "function": "create_user",
    "parameters": {
        "user": user
    }
}, callback);
```

###search(paths, callback)
Helper function for the ```search``` API function that returns all objects within specified paths. ```paths``` is a list of folder paths.

```javascript
mino.search(['/my_app/item'], callback);
```

```call``` alternative:
```javascript
mino.call({
    "function": "search",
    "parameters": {
        "paths": paths
    }
}, callback);
```

###add_static_signal(static_signal)
Adds a static signal. Read [signals](#signals) for more info.

###add_dynamic_signal_callback(name, callback)
Adds a dynamic signal. Read [signals](#signals) for more info.

###add_plugin([plugins..])
Adds plugins to a MinoDB instance. Read [plugins](#plugins) for more info.

###add_field_type(rule_field)
Adds a custom validation rule.

###get_plugin_scripts(mino_path)
Returns a list of script URLs that were registered by plugins as browser dependencies. Usually scripts are served by a plugin server. Read [plugins](#plugins) for more info.


##Plugins
MinoDB is designed to be extended with plugins. In fact, most of the out-of-the-box functionality is separated into distinct plugins, which are added by default. Default plugins include:
* AdminServer - server used for plugin configuration
* ApiServer - server that exposes MinoDB calls as an API
* BrowserServer - server that is used for viewing and modifying the data. Accessible on ```http://<SERVER_URL>/<MINO_PATH>/browser/``` (i.e. ```http://localhost:5002/mino/browser/```).

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
Should initialise the plugin. First argument is an instance of MinoDB. It is common to store minodb instance for future use and mount any additional servers if necessary. For example:
```javascript
BrowserServer.prototype.init = function(minodb){
    var bs = this;

    bs.minodb = minodb;
    minodb.internal_server().use(bs.path, bs.express_server);
}
```
If MinoDB was mounted under ```/mino/``` (i.e. ```server.use('/mino/', mino.server())```) and ```bs.path = 'browser'```, then URL of the mounted plugin server ```bs.express_server``` will be ```/mino/browser/```

####get_scripts()
Should return a list of script URLs that should be loaded in the browser when a specific page integrates with the plugin.

##Signals
Signals allow listening to changes within specific paths. Due to having several places where your data can be modified (i.e. Browser, your code and plugins), signals are incredibly useful for performing actions such as sending notifications when the data has changed. 

```javascript
var signal = new Signal({
    paths: ["/my_app/events/"],
    include_subfolders: false,
    handlers: ["save"],
    callback: function(object, handler) {
	    //Execute code
	}
});
mino.add_signal(signal);
```

* ```paths``` specifies which folders should be watched (i.e. created item in this folder would trigger the signal). If paths are not specified, then signal is triggered for all paths.
* ```include_subfolders``` specifies whether subfolders within ```paths``` should be watched as well.
* ```handlers``` specify which actions should trigger the signal (i.e. ```save```, ```delete```).
* ```callback``` is a function that will be called when the signal is triggered. ```object``` is a MinoDB [object](#objects).

