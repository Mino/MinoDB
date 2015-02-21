Folders are used to organize your data. Creating a folder with the full path ```/ExampleUser/People/``` allows you to save other <a href="?Objects">objects</a> into this path (e.g. ```/ExampleUser/People/John Smith```).

Folders are [Objects](objects) and as such have an ```ID```, ```Name``` and ```Path```. Their ```Folder``` value is set to true.

Folders can contain both other folders and [Items](Items).

Unlike <a href="?Items">items</a>, folders cannot be used to store data using <a href="?Types">types</a>.

Folders cannot be moved or renamed.

Prior to saving, a folder located in ```/ExampleUser/People/``` with the name ```Students``` would have the following basic structure:

```
{
    “name" : "Students",
    “path" : "/ExampleUser/People/",
    “folder" : true
}
```

Once saved, the folder will contain additional keys:

```
{
    "ID" : 1512,
    "Name" : "Students",
    "Path" : "/ExampleUser/People/",
    "Full Path" : "/ExampleUser/People/Students/",
    "Folder" : true,
    "Created" : "2013-05-11 18:21:24"
}
```

If a folder is saved into an <a href="?App Folders">app folder</a> then it will contain two additional keys that are used for searching (```App Path``` and ```App Full Path```):

<pre>{
    "ID" : 1519,
    "Name" : "Posts",
    "Path" : "/ExampleUser/Apps/SocialApp/Posts/",
    "Full Path" : "/ExampleUser/Apps/SocialApp/Posts/Post 1518/",
    "App Path" : "/SocialApp/Posts/",
    "App Full Path" : "/SocialApp/Posts/Post 1518/",
    "Folder" : true,
    "Created" : "2013-05-11 18:21:24"
}</pre>

Folders can be shared with other users. For more information see <a href="?Sharing">Sharing</a>.