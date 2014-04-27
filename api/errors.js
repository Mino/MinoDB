var errors = {
    CUSTOM_ERROR: [1000,"CUSTOM ERROR"],


	// 0 = "One or more errors.",
	// 1 = "Field missing.",
	// 2 = "Incorrect field type. Expected __Expected__.",
	// 3 = "Value required.",
	// 4 = "Unrecognized field.",
	// 5 = "Internal error."
	SOME_ERROR: [6,"Unavailable function requested."],//ServerHandler.handle
	SOME_ERROR: [7,"Invalid format for comma-separated IDs."],//Common.splitCSVIDs
	SOME_ERROR: [8,"Invalid format for path."],//Common.folderPathLevels Common.splitFolderPath 
	SOME_ERROR: [9,"One or both of the POST values 'username' and 'request' are not present or are empty."],//ServerHandler.handle
	SOME_ERROR: [10,"The request could not be decrypted. Incorrect username/key combination or incorrect encryption method used."],//ServerHandler.handle
	SOME_ERROR: [11,"Invalid format for address."],//GetRequestHandler.check SaveRequestHandler.check
	SOME_ERROR: [12,"One or more addresses could not be retrieved."],//GetRequestHandler.process
	SOME_ERROR: [13,"The request could not be decoded."],//ServerHandler.handle
	SOME_ERROR: [14,"Object does not exist or you are not permitted to access it."],//GetRequestHandler.process GetVersionListRequestHandler.process
	SOME_ERROR: [15,"Type does not exist or you are not permitted to access it."],//SaveRequestHandler.typeVersionNotAvailable TypeRetriever.run 
	SOME_ERROR: [16,"One or more of the 'request' fields 'Function', 'Parameters' and 'Time' are invalid or are empty."],//ServerHandler.handle
	SOME_ERROR: [17,"Invalid format. Expecting object."],//TypeVersion.createFields SearchRequestHandler.typeVersionAvailable
	SOME_ERROR: [18,"Invalid short type name."],//TypeVersion.initialize

	SOME_ERROR: [20,"Invalid field type."],//MinoField.createField 
	SOME_ERROR: [21,"Invalid field type so parameters cannot be checked."],//MinoField.createField
	SOME_ERROR: [22,"One or more fields contain errors."],//TypeVersion.createFields
	SOME_ERROR: [23,"Invalid type Version name."],//UNUSED
	SOME_ERROR: [24,"Invalid length value."],//TextField.TextField
	SOME_ERROR: [25,"Folders cannot accept types."],//MinoObject.MinoObject 
	SOME_ERROR: [26,"Key is Type Version, but value is not an object."],//MinoObject.MinoObject SearchRequestHandler.process
	SOME_ERROR: [27,"Value is less than __Minimum__."],//NumberField
	SOME_ERROR: [28,"Value is greater than __Maximum__."],//NumberField
	SOME_ERROR: [29,"Value must be an integer."],//NumberField.checkValidity CounterField.checkValidity
	SOME_ERROR: [30,"Length is less than __Minimum Length__."],//TextField.checkValidity SearchRequestHandler.process
	SOME_ERROR: [31,"Length is greater than __Maximum Length__."],//TextField.checkValidity
	SOME_ERROR: [32,"Folder does not exist or you are not permitted to write to it."],//MinoObject.finalCheck
	SOME_ERROR: [33,"Username is already taken."],//NewUserRequestHandler.process
	SOME_ERROR: [34,"Path does not exist or you are not permitted to access it."],//SaveRequestHandler.endOfPrivileges
	SOME_ERROR: [35,"Key is a type version, but value is not an array."],//SearchRequestHandler.check
	SOME_ERROR: [36,"Multiple nesting is not permitted."],//SaveRequestHandler
	SOME_ERROR: [37,"Invalid ID version."],//Common.splitCSVIDVersions GetVersionListRequestHandler.process
	SOME_ERROR: [38,"Invalid ID number."],//MinoObject.MinoObject GetRequestHandler.process SetTokenRequestHandler.process
	SOME_ERROR: [39,"Internal save error 1."],//MinoObject.doSaving (CAUSED BY A "NEW" ID ALREADY BEING ALLOCATED)
	SOME_ERROR: [40,"Invalid ID number provided. Only existing objects may be saved with an 'ID' field."],//MinoObject.doSaving (CAUSED BY ATTEMPTING TO SAVE AN OBJECT WITH AN ID WHICH IS NOT IN USE)
	SOME_ERROR: [41,"Internal save error 2."],// NOT IN USE - MinoObject.doSaving (CAUSED BY AN OBJECT NOT HAVING BEEN SAVED YET)
	SOME_ERROR: [42,"Internal save error 3."],//MinoObject.doSaving (CAUSED BY AN OLD VERSION'S JSONException)
	SOME_ERROR: [43,"An object with this name already exists in this folder."],//MinoObject.doSaving (CAUSED BY PATH BEING IN USE)
	SOME_ERROR: [44,"Internal save error 4."],//MinoObject.doSaving (CAUSED BY ERROR SAVING NEW VERSION)
	SOME_ERROR: [45,"The POST value 'request' is not present or empty."],//NewUserHandler.handle
	SOME_ERROR: [46,"Folders cannot be renamed or moved."],//MinoObject.doSaving
	SOME_ERROR: [47,"Invalid type version or type name."],//TypeVersion.initialize
	SOME_ERROR: [48,"Invalid type name."],//TypeVersion.initialize
	SOME_ERROR: [49,"Invalid type name. You may only create types for you own username."],//TypeVersion.initialize
	SOME_ERROR: [50,"Internal save error 5."],//SaveTypeRequestHandler.process (CAUSED BY ERROR SAVING NEW TYPE VERSION)
	SOME_ERROR: [51,"This type is required by __Required By__."],//TypeVersion.checkValidityOfItem
	SOME_ERROR: [52,"Invalid email or username."],
	SOME_ERROR: [53,"Invalid format for a username."],//NewUserHandler.handle Privilege.Privilege TypePrivilege.TypePrivilege
	SOME_ERROR: [54,"Invalid format for an email address."],//NewUserRequestHandler.handle EmailField.checkValidity
	SOME_ERROR: [55,"Invalid format for field name."],//MinoField.createField
	SOME_ERROR: [56,"Field name already exists."],//MinoField.createField
	SOME_ERROR: [57,"Invalid search parameter."],//NumberField.NumberField (CAUSED BY USING A PARAMETER WHICH IS VALID FOR TYPE CREATION, BUT NOT FOR SEARCHING)

	SOME_ERROR: [59,"Invalid format for an object name."],//MinoObject.MinoObject
	SOME_ERROR: [60,"Invalid format for privilege."],//Common.splitAndCheckValidPrivilegeStringForUsername
	SOME_ERROR: [61,"Version number is not current or next version."],//TypeVersion
	SOME_ERROR: [62,"Type version does not contain a field with this name."],//SearchRequestHandler.typeVersionAvailable
	SOME_ERROR: [63,"At least one of 'IDs Allowed' and 'Paths Allowed' must be set."],//LinkField.LinkField
	SOME_ERROR: [64,"'Child Of' may only be used if the field accepts paths."],//LinkField.LinkField
	SOME_ERROR: [65,"Invalid field parameter."],//LinkField.LinkField (CAUSED BY USING A PARAMETER WHICH IS VALID FOR SEARCHING, BUT NOT FOR TYPE CREATION)
	SOME_ERROR: [66,"Invalid path for this field's parameters."],//LinkField.checkValidity
	SOME_ERROR: [67,"Privleges may only be added for your own user folder."],//Common.splitAndCheckValidPrivilegeStringForUsername
	SOME_ERROR: [68,"To set array sizes 'Array' must be set to true."],//MinoField.createField
	SOME_ERROR: [69,"Invalid array size combination."],//MinoField.createField
	SOME_ERROR: [70,"Array is smaller than __Minimum Array Size__."],//MinoField.checkFieldInFieldMap
	SOME_ERROR: [71,"Array is larger than __Maximum Array Size__."],//MinoField.checkFieldInFieldMap
	SOME_ERROR: [72,"Invalid date format. Valid format is YYYY-MM-DD."],//DateField.DateField
	SOME_ERROR: [73,"Date is earlier than __Earliest__."],//DateField.checkValidity
	SOME_ERROR: [74,"Date is later than __Latest__."],//DateField.checkValidity
	CANT_GRANT_PATH: [75,"You cannot grant privileges to this folder."],//Privilege.Privilege
	SOME_ERROR: [76,"User does not exist."],//Privilege.reportUserExistance ChangePasswordRequestHandler.process StartPasswordResetRequestHandler.process
	SOME_ERROR: [77,"You cannot grant access to yourself."],//Privilege.Privilege TypePrivilege.TypePrivilege
	SOME_ERROR: [78,"Invalid choice."],//ChoiceField.checkValidity ChoiceField.ChoiceField
	SOME_ERROR: [79,"Multiple objects with this ID."],//MinoObject.MinoObject DeleteObject.DeleteObject
	SOME_ERROR: [80,"Object does not exist or you do not have permission to modify it."],
	SOME_ERROR: [81,"Invalid date."],//DateField.DateField
	SOME_ERROR: [82,"This object is protected and cannot be modified."],//MinoObject.MinoObject

	SOME_ERROR: [84,"Multiple references to this privilege."],//RemovePrivilege.RemovePrivilege

	SOME_ERROR: [86,"Invalid field name. Must either be an object property or a specific Field in a TypeVersion."],//SearchRequestHandler.process
	SOME_ERROR: [87,"Invalid format for URL."],//URLField.URLField
	SOME_ERROR: [88,"URL does not have required prefix."],//URLField.checkValidity
	SOME_ERROR: [89,"Types require at least 1 field."],//TypeVersion.TypeVersion
	SOME_ERROR: [90,"You have exceeded the maximum number of messages that may be sent in one request."],//SendMessagesRequestHandler.process


	SOME_ERROR: [93,"Invalid format for item path."],//Common.itemPathLevels Common.splitItemPath



	SOME_ERROR: [97,"You cannot change an object between an item and a folder."],//SaveRequestHandler.process


	SOME_ERROR: [100,"'Starting Index' must be at least zero."],//SearchRequestHandler.process
	SOME_ERROR: [101,"'Result Size' must be at least 1 and no more than 1000."],//SearchRequestHandler.process
	SOME_ERROR: [102,"Invalid token."],//CheckTokenRequestHandler.process
	SOME_ERROR: [103,"Deleting-related."],//MinoObject.doSaving
	SOME_ERROR: [104,"A conflicting Item is currently being saved."],//MinoObject.doSaving
	SOME_ERROR: [105,"This folder contains objects."],//DeleteObject.doDelete



	SOME_ERROR: [109,"Decryption Error."],//Crypt.decrypt
	SOME_ERROR: [110,"Counters cannot be used in arrays."],//MinoField.createField
	SOME_ERROR: [111,"Counters cannot be empty."],//MinoField.createField
	SOME_ERROR: [112,"Invalid format for counter address."],//Common.idFromCounterAddress
	SOME_ERROR: [113,"Invalid format for counter change."],//CounterRequestHandler.process
	SOME_ERROR: [114,"Counter does not exist or you are not permitted to access it."],//CounterRequestHandler.process
	SOME_ERROR: [115,"Counters may only have positive values."],//CounterField.checkValidity
	SOME_ERROR: [116,"This Object has been moved."],//DeleteObject.doSaving
	SOME_ERROR: [117,"Item paths cannot create child paths."],//Path.pathForChildWithName
	SOME_ERROR: [118,"Privilege does not exist."],//RemovePrivilege.checkExistance
	SOME_ERROR: [119,"This privilege is read only."],//RemovePrivilege.checkExistance
	SOME_ERROR: [120,"You cannot grant access to this TypeVersion."],//TypePrivilege.TypePrivilege
	SOME_ERROR: [121,"Type Version does not exist."],//TypePrivilege.typeVersionNotAvailable
	SOME_ERROR: [122,"Email address does not have required domain name."],//EmailField.checkValidity
	SOME_ERROR: [123,"Invalid format for a domain."],//EmailField.EmailField
	SOME_ERROR: [124,"Session error."],//APIHandler.handle
	SOME_ERROR: [125,"You cannot grant write privileges publicly."],//Privilege.Privilege

	SOME_ERROR: [127,"At least one of 'Items Allowed' and 'Folders Allowed' must be set."],//LinkField.LinkField
	SOME_ERROR: [128,"Invalid password format."],//ChangePasswordRequestHandler.process
	SOME_ERROR: [129,"Old password is not valid."],//ChangePasswordRequestHandler.process
	SOME_ERROR: [130,"Array fields cannot be sorted by."],//SearchRequestHandler.process
	SOME_ERROR: [131,"Field does not exist in the specified Type Version."],//SearchRequestHandler.process
	SOME_ERROR: [132,"Email address is already in use."],//NewUserRequestHandler.process
	SOME_ERROR: [133,"Invalid latitude. Range is -90 to +90."],//Location.Location
	SOME_ERROR: [134,"Invalid longitude. Range is -180 to +180."],//Location.Location
	SOME_ERROR: [135,"Distance cannot be negative."],//Location.Location
	SOME_ERROR: [136,"Invalid date time format. Valid format is YYYY-MM-DD HH:MM:SS"],//DateTimeField.checkValidity
	SOME_ERROR: [137,"To specify 'Allow Subfolders', 'Previous Path' must be set."],//MinoObject.MinoObject
	SOME_ERROR: [138,"Invalid version number."],//MinoObject.MinoObject DeleteVersionsRequestHandler.process
	SOME_ERROR: [139,"Conditions cannot be used in object creation."],//MinoObject.MinoObject
	SOME_ERROR: [140,"Condition void as 'Allow move' is set to false."],//MinoObject.MinoObject
	SOME_ERROR: [141,"Path and name modification not permitted in conditions."],//MinoObject.doSaving
	SOME_ERROR: [142,"Previous path does not meet conditions."],//MinoObject.doSaving
	SOME_ERROR: [143,"Object may have been modified since specified version."],//MinoObject.doSaving
	SOME_ERROR: [144,"Invalid numerical value."],//NumberField.checkValidity
	SOME_ERROR: [145,"Invalid username or email address."],//StartPasswordResetRequestHandler.process

	SOME_ERROR: [147,"User has not granted privileges for this function."],//ThirdPartyRequestHandler.process
	SOME_ERROR: [148,"Descriptions cannot be longer than 200 characters."],//MinoField.createField TypeVersion.TypeVersion
	SOME_ERROR: [149,"Invalid Sort Order. Order can either be 'Ascending' or 'Descending'."],//SearchRequestHandler.process
	SOME_ERROR: [150,"'Starting Version' cannot be greater than the current version (__Current Version__)."],//GetVersionListRequestHandler.process
	SOME_ERROR: [151,"The number of objects to delete exceeds the limit of 1000."],//DeleteRequestHandler.process
	SOME_ERROR: [152,"The number of addresses to get exceeds the limit of 1000."],//GetRequestHandler.process
	SOME_ERROR: [153,"The number of versions to delete exceeds the limit of 1000."],//DeleteVersionsRequestHandler.process
	SOME_ERROR: [154,"The latest version of an object cannot be deleted until the object has been deleted."],//DeleteVersionsRequestHandler.process
	SOME_ERROR: [155,"This request has failed the Retransmission Prevention Mechanism which exists to prevent requests being resubmitted by a third party."],//APIHandler
	SOME_ERROR: [156,"The time sent with the request is out by more than 12 hours."],//APIHandler
	SOME_ERROR: [157,"Condition field(s) present alongside search parameters."],//Condition
	SOME_ERROR: [158,"Invalid operator."],//Condition

	SOME_ERROR: [160,"At least one choice is required."],//ChoiceField,




	SOME_ERROR: [170,"'Sort Order' cannot be used if 'Sort By' is not set."],//SearchRequestHandler.process
	SOME_ERROR: [171,"Invalid JSON object syntax."],//TreeField.checkValidity

	SOME_ERROR: [173,"'Conditions' are not present."],//Condition.Condition
	SOME_ERROR: [174,"Invalid date time."],//DateTimeField.DateTimeField
	SOME_ERROR: [175,"Path is not a child of __Child Of__."],//LinkField.checkValidity
	SOME_ERROR: [176,"'Child Of' cannot be used if 'Paths Allowed' is not set to true."],//LinkField.LinkField
	SOME_ERROR: [177,"Invalid password."],//CheckPasswordRequestHandler.process
	SOME_ERROR: [178,"Invalid Path for a Folder."],//LinkField.process
	SOME_ERROR: [179,"Session ID does not exist."],//SignOutRequestHandler
	SOME_ERROR: [180,"Version number provided is not the next version."],//TypeVersion
	SOME_ERROR: [181,"The revised field has a different field type. The existing type is __Existing Field Type__."],//TypeComparer
	SOME_ERROR: [182,"The revised field's 'Array' value must match the existing one. The existing value is __Existing Array Value__."],//TypeComparer
	SOME_ERROR: [183,"This field is deprecated. It cannot be saved."],//ValueField
	SOME_ERROR: [184,"The specified Type does not exist."],//TypeVersion
};

module.exports = errors;