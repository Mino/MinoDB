Items are <a href="?Objects">objects</a> and as such have an ```ID```, ```Name``` and ```Path```. Their ```Folder``` key is set to false.

Items are used to hold data defined by <a href="?Types">types</a>. The fields defined in the <a href="?Types">type</a> are stored by their ```Name``` key under the ```Full Name``` of the <a href="?Types">type</a>.

Prior to saving, an item that holds a single <a href="?Types">type</a> named ```ExampleUser.Person.1``` would have the following structure:

```{
    "Name" : "John Smith",
    "Path" : "/ExampleUser/People/",
    "Folder" : false,
    "ExampleUser.Person.1" : {
        "First Name" : "John",
        "Last Name" : "Smith",
        "Date of Birth" : "1983-04-28"
    }
}```

Once saved, an item will contain additional fields:

```
{
    "ID" : 466,
    "Name" : "John Smith",
    "Path" : "/ExampleUser/People/",
    "Full Path" : "/ExampleUser/People/John Smith"
    "Folder" : false,
    "Created" : "2013-05-11 17:20:23",
    "Last Updated" : "2013-05-11 17:20:23",
    "Version" : 1,
    "ExampleUser.Person.1" : {
        "First Name" : "John",
        "Last Name" : "Smith",
        "Date of Birth" : "1983-04-28"
    }
}
```

If an item is saved into an <a href="?App Folders">app folder</a> then it will contain two additional fields that are used for searching (```App Path``` and ```App Full Path```):

```{
    "ID" : 1518,
    "Name" : "Post 1518",
    "Path" : "/ExampleUser/Apps/SocialApp/Posts/",
    "Full Path" : "/ExampleUser/Apps/SocialApp/Posts/Post 1518"
    "App Path" : "/SocialApp/Posts/",
    "App Full Path" : "/SocialApp/Posts/Post 1518"
    "Folder" : false,
    "Created" : "2013-05-11 16:19:22",
    "Last Updated" : "2013-05-11 16:19:22",
    "Version" : 1,
    "SocialApp.Post.1" : {
        "Content" : "Hello World! This is my first post."
    }
}```

Items can contain multiple <a href="?Types">types</a> so that you can represent subclasses or add additional fields that may not be appropriate to store with all items, such as the example shown below.

```{
    "ID" : 1519,
    "Name" : "Post 1519",
    "Path" : "/ExampleUser/Apps/SocialApp/Posts/",
    "Full Path" : "/ExampleUser/Apps/SocialApp/Posts/Post 1519"
    "App Path" : "/SocialApp/Posts/",
    "App Full Path" : "/SocialApp/Posts/Post 1519"
    "Folder" : false,
    "Created" : "2013-05-11 16:25:07",
    "Last Updated" : "2013-05-11 16:25:07",
    "Version" : 1,
    "SocialApp.Post.1" : {
        "Content" : "Here are some photos that I took on my holiday!"
    },
    "SocialApp.PhotoPost.1" : {
        "Photo Addresses" : [
            "http://example.com/photos/151255.jpg",
            "http://example.com/photos/151256.jpg"
        ]
    }
}```