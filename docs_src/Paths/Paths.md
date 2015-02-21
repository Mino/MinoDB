Paths are built from the forward-slash (```/```) delimited [Folders](folder) names of an [Objects](object)'s ancestors.

A ```full_path``` is the concatenation (joining) of the ```Path``` and the ```Name``` of the [Objects](object). An example is shown below using an [Items](item) named ```John Smith```:

```
"name" : "John Smith",
"path" : "/ExampleUser/People/",
"full_path" : "/ExampleUser/People/John Smith"
```


Every ```Full Path``` must be unique. If the [Objects](object) is a [Folders](folder) then the ```Full Path``` ends in a forward-slash. This allows you to have a [Folders](folder) and an [Items](item) with the same name in a [Folders](folder).

Each User owns the root [Folders](folder) of the same name. The User ```ExampleUser``` has the [Folders](folder) ```/ExampleUser/```.

Example
====
If the user ```ExampleUser``` creates a [Folders](folder) named ```People``` within their root [Folders](folder), this new [Folders](folder) will have a ```Full Path``` of ```/ExampleUser/People/``` and a ```Path``` of ```/ExampleUser/```.

An [Items](item) within this ```People``` [Folders](folder) named ```John Smith``` will have a ```Full Path``` of ```/ExampleUser/People/John Smith``` and a ```Path``` of ```/ExampleUser/People/```.

The ```Full Path```s of the [Objects](objects) in the above example are shown below.

* ```/ExampleUser/```
* ```/ExampleUser/People/```
* ```/ExampleUser/People/John Smith```