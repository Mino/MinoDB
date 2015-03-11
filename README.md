MinoDB
======

MinoDB is an extensible database layer for web apps. Utilizing [MongoDB](http://www.mongodb.org/)'s freedom, MinoDB adds well-designed structure - providing power of building apps extremely faster.

Main features:
* Familiar folder structure - easy to organise and view your data.
* Reusable database schema. Create forms and validate JSON objects with a few lines of code.
* Users and permissions out of the box
* UI for your data - an admin interface that your non-technical colleagues can use without having to building one from scratch.
* Plugins - customise and add functionality with plugins. Building one is as easy as building an express app.
* Signals - listen to data changes within a folder. Extremely useful for integrating with Slack, Trello, Zapier and others.
* Built-in validation powered by [FieldVal](https://github.com/FieldVal/fieldval-js)

MinoDB is for startups and developers who need to build high quality web apps extremely fast. It doesn't get in your way - it's completely up to you to structure your code. When MinoDB APIs aren't good enough - you can call MongoDB in any way you're used too.

Use cases:
* Primary data storage
* Secondary data storage (i.e. CMS or storage for calendar)

###Notice: ALPHA release - use at your own risk.

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
```javascript
var mino = new MinoDB(config, [username]);
```

```config``` is a JSON object with following keys:
* ```db_address``` - MongoDB URL (i.e. ```mongodb://127.0.0.1:27017/minodb```)
* ```dynamic_signals_enabled``` - boolean specifying whether dynamic signals should be enabled. Default is ```true```. Read [signals](#signals) for more info.

```username``` specifies which user should be making API calls when running ```call()``` or its helper functions.

###call(parameters, callback)
Calls MinoDB API. Parameters should be in a following format:
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

###server()
Returns main express server used by MinoDB instance.


##Plugins
MinoDB is designed to be extended with plugins. In fact, most of the out-of-the-box functionality is implemented as distinct plugins, which are added by default. Default plugins include:
* AdminServer - server used for plugin configuration
* ApiServer - server that exposes MinoDB calls as an API
* BrowserServer - server that is used for viewing and modifying the data

###Mino plugins
* [MinoVal](https://github.com/MarcusLongmuir/MinoVal)
* [MinoCMS](https://github.com/bestan/MinoCMS)
* MinoWebhooks

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
Should initialise the plugin. First argument is an instance of MinoDB. It is common to store minodb instance for future use and mount any additoinal servers if necessary. For example:
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

There are two types of signals - static and dynamic.

###Static signals
Static signals are defined in the code.
```javascript
var signal = new StaticSignal({
	paths: ["/my_app/events/"],
	include_subfolders: false,
	handlers: ["save"],
	callback: function(object) {
		//Executed code
	}
});
mino.add_static_signal(signal);
```

* ```paths``` specifies which folder should be watched (i.e. new item in this folder would trigger the signal).
* ```include_subfolders``` specifies whether subfolders within ```paths``` should be watched as well.
* ```handlers``` specify which actions should trigger the signal (i.e. ```save```, ```delete```)
* ```callback``` is a function that will be called when the signal is triggered. ```object``` is a MinoDB [object](#objects).

###Dynamic signals
Dynamic signals are MinoDB [items](#items) that are stored in ```/<USERNAME>/signals/``` folder. They can be added and removed without re-deploying the code - simply navigate to ```signals``` folder in the browser and make your changes. Alternatively, you can create and modify dynamic signals in your code with Mino API calls (again, it's just an item).

Dynamic signals need to include ```mino_signal``` type.

```javascript
{
	name: "signal_with_subfolders",
	path: "/testuser/signals/",
	mino_signal: {
		paths: ["/testuser/folder/"],
		include_subfolders: true,
		handlers: ["save"],
	}
}
```

Dynamic signals work great with MinoWebhooks plugin, which makes it easy to integrate services like Slack, Trello, Zapier without re-deploying code.

**Note**: dynamic signals are great for rapid development, but they make additional database calls on every API call, which might impact performance of the application. When this becomes an issue, it is possible to disable them by passing ```dynamic_signals_enabled: false``` to MinoDB config.

##Examples
* [Mino Calendar example](https://github.com/bestan/mino-calendar-example)
* [Mino CMS example](https://github.com/bestan/mino-cms-example)
