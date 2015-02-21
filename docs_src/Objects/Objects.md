Both the [items](Items) that store data and the [folders](Folders) that create hierarchy are objects.

Every object has the following fields:

* _id - The ID of the object.
* name - The name of the object. It must be unique to the object's [path](Paths).
* path - The [paths](Paths) of the object. It is the ```full_path``` of the parent [folders](Folders).
* folder - A boolean indicating whether or not the object is a [folder](Folders).

For more information on the two types of objects:

* [Items](Items) can contain data in structures defined by <a href="?Types">types</a> and can be moved and renamed.</li>
* [Folders](Folders) cannot contain data and can neither be moved or renamed.