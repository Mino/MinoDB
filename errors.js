var errors = {	
	SOME_ERROR: {	
		error: 6,
		error_message: "Unavailable function requested."
	},
	INVALID_FOLDER_PATH_FORMAT: {	
		error: 7,
		error_message: "Invalid folder path."
	},
	INVALID_PATH_FORMAT: {
		error: 8,
		error_message: "Invalid format for path."
	},
	SOME_ERROR: {	
		error: 9,
		error_message: "One or both of the POST values 'username' and 'request' are not present or are empty."
	},
	SOME_ERROR: {	
		error: 10,
		error_message: "The request could not be decrypted. Incorrect username/key combination or incorrect encryption method used."
	},
	SOME_ERROR: {	
		error: 11,
		error_message: "Invalid format for address."
	},
	SOME_ERROR: {	
		error: 12,
		error_message: "One or more addresses could not be retrieved."
	},
	SOME_ERROR: {	
		error: 13,
		error_message: "The request could not be decoded."
	},
	SOME_ERROR: {	
		error: 14,
		error_message: "Object does not exist or you are not permitted to access it."
	},
	SOME_ERROR: {	
		error: 15,
		error_message: "Type does not exist or you are not permitted to access it."
	},
	SOME_ERROR: {	
		error: 16,
		error_message: "One or more of the 'request' fields 'Function', 'Parameters' and 'Time' are invalid or are empty."
	},
	SOME_ERROR: {	
		error: 17,
		error_message: "Invalid format. Expecting object."
	},
	SOME_ERROR: {	
		error: 18,
		error_message: "Invalid short type name."
	},
	NO_WRITE_PERMISSION: {
		error: 19,
		error_message: "You do not have permission to write to this path."
	},
	SOME_ERROR: {	
		error: 20,
		error_message: "Invalid field type."
	},
	SOME_ERROR: {	
		error: 21,
		error_message: "Invalid field type so parameters cannot be checked."
	},
	SOME_ERROR: {	
		error: 22,
		error_message: "One or more fields contain errors."
	},
	SOME_ERROR: {	
		error: 23,
		error_message: "Invalid type Version name."
	},
	SOME_ERROR: {	
		error: 24,
		error_message: "Invalid length value."
	},
	SOME_ERROR: {	
		error: 25,
		error_message: "Folders cannot accept types."
	},
	SOME_ERROR: {	
		error: 26,
		error_message: "Key is Type Version, but value is not an object."
	},
	SOME_ERROR: {	
		error: 27,
		error_message: "Value is less than __Minimum__."
	},
	SOME_ERROR: {	
		error: 28,
		error_message: "Value is greater than __Maximum__."
	},
	SOME_ERROR: {	
		error: 29,
		error_message: "Value must be an integer."
	},
	SOME_ERROR: {	
		error: 30,
		error_message: "Length is less than __Minimum Length__."
	},
	SOME_ERROR: {	
		error: 31,
		error_message: "Length is greater than __Maximum Length__."
	},
	SOME_ERROR: {	
		error: 32,
		error_message: "Folder does not exist or you are not permitted to write to it."
	},
	SOME_ERROR: {	
		error: 33,
		error_message: "Username is already taken."
	},
	SOME_ERROR: {	
		error: 34,
		error_message: "Path does not exist or you are not permitted to access it."
	},
	SOME_ERROR: {	
		error: 35,
		error_message: "Key is a type version, but value is not an array."
	},
	SOME_ERROR: {	
		error: 36,
		error_message: "Multiple nesting is not permitted."
	},
	SOME_ERROR: {	
		error: 37,
		error_message: "Invalid ID version."
	},
	SOME_ERROR: {	
		error: 38,
		error_message: "Invalid ID number."
	},
	SOME_ERROR: {	
		error: 39,
		error_message: "Internal save error 1."
	},
	SOME_ERROR: {	
		error: 40,
		error_message: "Invalid ID number provided. Only existing objects may be saved with an 'ID' field."
	},
	SOME_ERROR: {	
		error: 41,
		error_message: "Internal save error 2."
	},
	SOME_ERROR: {	
		error: 42,
		error_message: "Internal save error 3."
	},
	SOME_ERROR: {	
		error: 43,
		error_message: "An object with this name already exists in this folder."
	},
	SOME_ERROR: {	
		error: 44,
		error_message: "Internal save error 4."
	},
	SOME_ERROR: {	
		error: 45,
		error_message: "The POST value 'request' is not present or empty."
	},
	SOME_ERROR: {	
		error: 46,
		error_message: "Folders cannot be renamed or moved."
	},
	SOME_ERROR: {	
		error: 47,
		error_message: "Invalid type version or type name."
	},
	SOME_ERROR: {	
		error: 48,
		error_message: "Invalid type name."
	},
	SOME_ERROR: {	
		error: 49,
		error_message: "Invalid type name. You may only create types for you own username."
	},
	SOME_ERROR: {	
		error: 50,
		error_message: "Internal save error 5."
	},
	SOME_ERROR: {	
		error: 51,
		error_message: "This type is required by __Required By__."
	},
	NOT_EMAIL_OR_USERNAME: {	
		error: 52,
		error_message: "Invalid email or username."
	},
	SOME_ERROR: {	
		error: 53,
		error_message: "Invalid format for a username."
	},
	SOME_ERROR: {	
		error: 54,
		error_message: "Invalid format for an email address."
	},
	SOME_ERROR: {	
		error: 55,
		error_message: "Invalid format for field name."
	},
	SOME_ERROR: {	
		error: 56,
		error_message: "Field name already exists."
	},
	SOME_ERROR: {	
		error: 57,
		error_message: "Invalid search parameter."
	},
	INVALID_OBJECT_NAME: {	
		error: 59,
		error_message: "Invalid format for an object name."
	},
	SOME_ERROR: {	
		error: 60,
		error_message: "Invalid format for privilege."
	},
	SOME_ERROR: {	
		error: 61,
		error_message: "Version number is not current or next version."
	},
	SOME_ERROR: {	
		error: 62,
		error_message: "Type version does not contain a field with this name."
	},
	SOME_ERROR: {	
		error: 63,
		error_message: "At least one of 'IDs Allowed' and 'Paths Allowed' must be set."
	},
	SOME_ERROR: {	
		error: 64,
		error_message: "'Child Of' may only be used if the field accepts paths."
	},
	SOME_ERROR: {	
		error: 65,
		error_message: "Invalid field parameter."
	},
	SOME_ERROR: {	
		error: 66,
		error_message: "Invalid path for this field's parameters."
	},
	SOME_ERROR: {	
		error: 67,
		error_message: "Privleges may only be added for your own user folder."
	},
	SOME_ERROR: {	
		error: 68,
		error_message: "To set array sizes 'Array' must be set to true."
	},
	SOME_ERROR: {	
		error: 69,
		error_message: "Invalid array size combination."
	},
	SOME_ERROR: {	
		error: 70,
		error_message: "Array is smaller than __Minimum Array Size__."
	},
	SOME_ERROR: {	
		error: 71,
		error_message: "Array is larger than __Maximum Array Size__."
	},
	SOME_ERROR: {	
		error: 72,
		error_message: "Invalid date format. Valid format is YYYY-MM-DD."
	},
	SOME_ERROR: {	
		error: 73,
		error_message: "Date is earlier than __Earliest__."
	},
	SOME_ERROR: {	
		error: 74,
		error_message: "Date is later than __Latest__."
	},
	CANT_GRANT_PATH: {
		error: 75,
		error_message: "You cannot grant privileges to this folder."
	},
	USER_DOES_NOT_EXIST: {	
		error: 76,
		error_message: "User does not exist."
	},
	SOME_ERROR: {	
		error: 77,
		error_message: "You cannot grant access to yourself."
	},
	SOME_ERROR: {	
		error: 78,
		error_message: "Invalid choice."
	},
	SOME_ERROR: {	
		error: 79,
		error_message: "Multiple objects with this ID."
	},
	SOME_ERROR: {	
		error: 80,
		error_message: "Object does not exist or you do not have permission to modify it."
	},
	SOME_ERROR: {	
		error: 81,
		error_message: "Invalid date."
	},
	SOME_ERROR: {	
		error: 82,
		error_message: "This object is protected and cannot be modified."
	},
	SOME_ERROR: {	
		error: 84,
		error_message: "Multiple references to this privilege."
	},
	SOME_ERROR: {	
		error: 86,
		error_message: "Invalid field name. Must either be an object property or a specific Field in a TypeVersion."
	},
	SOME_ERROR: {	
		error: 87,
		error_message: "Invalid format for URL."
	},
	SOME_ERROR: {	
		error: 88,
		error_message: "URL does not have required prefix."
	},
	SOME_ERROR: {	
		error: 89,
		error_message: "Types require at least 1 field."
	},
	SOME_ERROR: {	
		error: 90,
		error_message: "You have exceeded the maximum number of messages that may be sent in one request."
	},
	SOME_ERROR: {	
		error: 93,
		error_message: "Invalid format for item path."
	},
	SOME_ERROR: {	
		error: 97,
		error_message: "You cannot change an object between an item and a folder."
	},
	SOME_ERROR: {	
		error: 100,
		error_message: "'Starting Index' must be at least zero."
	},
	SOME_ERROR: {	
		error: 101,
		error_message: "'Result Size' must be at least 1 and no more than 1000."
	},
	SOME_ERROR: {	
		error: 102,
		error_message: "Invalid token."
	},
	SOME_ERROR: {	
		error: 103,
		error_message: "Deleting-related."
	},
	SOME_ERROR: {	
		error: 104,
		error_message: "A conflicting Item is currently being saved."
	},
	SOME_ERROR: {	
		error: 105,
		error_message: "This folder contains objects."
	},
	SOME_ERROR: {	
		error: 109,
		error_message: "Decryption Error."
	},
	SOME_ERROR: {	
		error: 110,
		error_message: "Counters cannot be used in arrays."
	},
	SOME_ERROR: {	
		error: 111,
		error_message: "Counters cannot be empty."
	},
	SOME_ERROR: {	
		error: 112,
		error_message: "Invalid format for counter address."
	},
	SOME_ERROR: {	
		error: 113,
		error_message: "Invalid format for counter change."
	},
	SOME_ERROR: {	
		error: 114,
		error_message: "Counter does not exist or you are not permitted to access it."
	},
	SOME_ERROR: {	
		error: 115,
		error_message: "Counters may only have positive values."
	},
	SOME_ERROR: {	
		error: 116,
		error_message: "This Object has been moved."
	},
	CHILD_FROM_ITEM_PATH: {	
		error: 117,
		error_message: "Item paths cannot create child paths."
	},
	SOME_ERROR: {	
		error: 118,
		error_message: "Privilege does not exist."
	},
	SOME_ERROR: {	
		error: 119,
		error_message: "This privilege is read only."
	},
	SOME_ERROR: {	
		error: 120,
		error_message: "You cannot grant access to this TypeVersion."
	},
	SOME_ERROR: {	
		error: 121,
		error_message: "Type Version does not exist."
	},
	SOME_ERROR: {	
		error: 122,
		error_message: "Email address does not have required domain name."
	},
	SOME_ERROR: {	
		error: 123,
		error_message: "Invalid format for a domain."
	},
	SOME_ERROR: {	
		error: 124,
		error_message: "Session error."
	},
	SOME_ERROR: {	
		error: 125,
		error_message: "You cannot grant write privileges publicly."
	},
	SOME_ERROR: {	
		error: 127,
		error_message: "At least one of 'Items Allowed' and 'Folders Allowed' must be set."
	},
	SOME_ERROR: {	
		error: 128,
		error_message: "Invalid password format."
	},
	SOME_ERROR: {	
		error: 129,
		error_message: "Old password is not valid."
	},
	SOME_ERROR: {	
		error: 130,
		error_message: "Array fields cannot be sorted by."
	},
	SOME_ERROR: {	
		error: 131,
		error_message: "Field does not exist in the specified Type Version."
	},
	SOME_ERROR: {	
		error: 132,
		error_message: "Email address is already in use."
	},
	SOME_ERROR: {	
		error: 133,
		error_message: "Invalid latitude. Range is -90 to +90."
	},
	SOME_ERROR: {	
		error: 134,
		error_message: "Invalid longitude. Range is -180 to +180."
	},
	SOME_ERROR: {	
		error: 135,
		error_message: "Distance cannot be negative."
	},
	SOME_ERROR: {	
		error: 136,
		error_message: "Invalid date time format. Valid format is YYYY-MM-DD HH:MM:SS"
	},
	SOME_ERROR: {	
		error: 137,
		error_message: "To specify 'Allow Subfolders', 'Previous Path' must be set."
	},
	SOME_ERROR: {	
		error: 138,
		error_message: "Invalid version number."
	},
	SOME_ERROR: {	
		error: 139,
		error_message: "Conditions cannot be used in object creation."
	},
	SOME_ERROR: {	
		error: 140,
		error_message: "Condition void as 'Allow move' is set to false."
	},
	SOME_ERROR: {	
		error: 141,
		error_message: "Path and name modification not permitted in conditions."
	},
	SOME_ERROR: {	
		error: 142,
		error_message: "Previous path does not meet conditions."
	},
	SOME_ERROR: {	
		error: 143,
		error_message: "Object may have been modified since specified version."
	},
	SOME_ERROR: {	
		error: 144,
		error_message: "Invalid numerical value."
	},
	SOME_ERROR: {	
		error: 145,
		error_message: "Invalid username or email address."
	},
	SOME_ERROR: {	
		error: 147,
		error_message: "User has not granted privileges for this function."
	},
	SOME_ERROR: {	
		error: 148,
		error_message: "Descriptions cannot be longer than 200 characters."
	},
	SOME_ERROR: {	
		error: 149,
		error_message: "Invalid Sort Order. Order can either be 'Ascending' or 'Descending'."
	},
	SOME_ERROR: {	
		error: 150,
		error_message: "'Starting Version' cannot be greater than the current version (__Current Version__)."
	},
	SOME_ERROR: {	
		error: 151,
		error_message: "The number of objects to delete exceeds the limit of 1000."
	},
	SOME_ERROR: {	
		error: 152,
		error_message: "The number of addresses to get exceeds the limit of 1000."
	},
	SOME_ERROR: {	
		error: 153,
		error_message: "The number of versions to delete exceeds the limit of 1000."
	},
	SOME_ERROR: {	
		error: 154,
		error_message: "The latest version of an object cannot be deleted until the object has been deleted."
	},
	SOME_ERROR: {	
		error: 155,
		error_message: "This request has failed the Retransmission Prevention Mechanism which exists to prevent requests being resubmitted by a third party."
	},
	SOME_ERROR: {	
		error: 156,
		error_message: "The time sent with the request is out by more than 12 hours."
	},
	SOME_ERROR: {	
		error: 157,
		error_message: "Condition field(s) present alongside search parameters."
	},
	SOME_ERROR: {	
		error: 158,
		error_message: "Invalid operator."
	},
	SOME_ERROR: {	
		error: 160,
		error_message: "At least one choice is required."
	},
	SOME_ERROR: {	
		error: 170,
		error_message: "'Sort Order' cannot be used if 'Sort By' is not set."
	},
	SOME_ERROR: {	
		error: 171,
		error_message: "Invalid JSON object syntax."
	},
	SOME_ERROR: {	
		error: 173,
		error_message: "'Conditions' are not present."
	},
	SOME_ERROR: {	
		error: 174,
		error_message: "Invalid date time."
	},
	SOME_ERROR: {	
		error: 175,
		error_message: "Path is not a child of __Child Of__."
	},
	SOME_ERROR: {	
		error: 176,
		error_message: "'Child Of' cannot be used if 'Paths Allowed' is not set to true."
	},
	SOME_ERROR: {	
		error: 177,
		error_message: "Invalid password."
	},
	SOME_ERROR: {	
		error: 178,
		error_message: "Invalid Path for a Folder."
	},
	SOME_ERROR: {	
		error: 179,
		error_message: "Session ID does not exist."
	},
	SOME_ERROR: {	
		error: 180,
		error_message: "Version number provided is not the next version."
	},
	SOME_ERROR: {	
		error: 181,
		error_message: "The revised field has a different field type. The existing type is __Existing Field Type__."
	},
	SOME_ERROR: {	
		error: 182,
		error_message: "The revised field's 'Array' value must match the existing one. The existing value is __Existing Array Value__."
	},
	SOME_ERROR: {	
		error: 183,
		error_message: "This field is deprecated. It cannot be saved."
	},
	SOME_ERROR: {	
		error: 184,
		error_message: "The specified Type does not exist."
	}
};


if (typeof module != 'undefined') {
    module.exports = errors;
}