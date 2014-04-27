public class ValidatorErrorExtender {
	
	public static void extendErrors(){
		String[] extendedErrorStrings = new String[] {
				// 0 = "One or more errors.",
				// 1 = "Field missing.",
				// 2 = "Incorrect field type. Expected __Expected__.",
				// 3 = "Value required.",
				// 4 = "Unrecognized field.",
				// 5 = "Internal error."
				/* 6 */ "Unavailable function requested.",//ServerHandler.handle
				/* 7 */ "Invalid format for comma-separated IDs.",//Common.splitCSVIDs
				/* 8 */ "Invalid format for path.",//Common.folderPathLevels Common.splitFolderPath 
				/* 9 */ "One or both of the POST values 'username' and 'request' are not present or are empty.",//ServerHandler.handle
				/* 10 */ "The request could not be decrypted. Incorrect username/key combination or incorrect encryption method used.",//ServerHandler.handle
				/* 11 */ "Invalid format for address.",//GetRequestHandler.check SaveRequestHandler.check
				/* 12 */ "One or more addresses could not be retrieved.",//GetRequestHandler.process
				/* 13 */ "The request could not be decoded.",//ServerHandler.handle
				/* 14 */ "Object does not exist or you are not permitted to access it.",//GetRequestHandler.process GetVersionListRequestHandler.process
				/* 15 */ "Type does not exist or you are not permitted to access it.",//SaveRequestHandler.typeVersionNotAvailable TypeRetriever.run 
				/* 16 */ "One or more of the 'request' fields 'Function', 'Parameters' and 'Time' are invalid or are empty.",//ServerHandler.handle
				/* 17 */ "Invalid format. Expecting object.",//TypeVersion.createFields SearchRequestHandler.typeVersionAvailable
				/* 18 */ "Invalid short type name.",//TypeVersion.initialize

				/* 20 */ "Invalid field type.",//MinoField.createField 
				/* 21 */ "Invalid field type so parameters cannot be checked.",//MinoField.createField
				/* 22 */ "One or more fields contain errors.",//TypeVersion.createFields
				/* 23 */ "Invalid type Version name.",//UNUSED
				/* 24 */ "Invalid length value.",//TextField.TextField
				/* 25 */ "Folders cannot accept types.",//MinoObject.MinoObject 
				/* 26 */ "Key is Type Version, but value is not an object.",//MinoObject.MinoObject SearchRequestHandler.process
				/* 27 */ "Value is less than __Minimum__.",//NumberField
				/* 28 */ "Value is greater than __Maximum__.",//NumberField
				/* 29 */ "Value must be an integer.",//NumberField.checkValidity CounterField.checkValidity
				/* 30 */ "Length is less than __Minimum Length__.",//TextField.checkValidity SearchRequestHandler.process
				/* 31 */ "Length is greater than __Maximum Length__.",//TextField.checkValidity
				/* 32 */ "Folder does not exist or you are not permitted to write to it.",//MinoObject.finalCheck
				/* 33 */ "Username is already taken.",//NewUserRequestHandler.process
				/* 34 */ "Path does not exist or you are not permitted to access it.",//SaveRequestHandler.endOfPrivileges
				/* 35 */ "Key is a type version, but value is not an array.",//SearchRequestHandler.check
				/* 36 */ "Multiple nesting is not permitted.",//SaveRequestHandler
				/* 37 */ "Invalid ID version.",//Common.splitCSVIDVersions GetVersionListRequestHandler.process
				/* 38 */ "Invalid ID number.",//MinoObject.MinoObject GetRequestHandler.process SetTokenRequestHandler.process
				/* 39 */ "Internal save error 1.",//MinoObject.doSaving (CAUSED BY A "NEW" ID ALREADY BEING ALLOCATED)
				/* 40 */ "Invalid ID number provided. Only existing objects may be saved with an 'ID' field.",//MinoObject.doSaving (CAUSED BY ATTEMPTING TO SAVE AN OBJECT WITH AN ID WHICH IS NOT IN USE)
				/* 41 */ "Internal save error 2.",// NOT IN USE - MinoObject.doSaving (CAUSED BY AN OBJECT NOT HAVING BEEN SAVED YET)
				/* 42 */ "Internal save error 3.",//MinoObject.doSaving (CAUSED BY AN OLD VERSION'S JSONException)
				/* 43 */ "An object with this name already exists in this folder.",//MinoObject.doSaving (CAUSED BY PATH BEING IN USE)
				/* 44 */ "Internal save error 4.",//MinoObject.doSaving (CAUSED BY ERROR SAVING NEW VERSION)
				/* 45 */ "The POST value 'request' is not present or empty.",//NewUserHandler.handle
				/* 46 */ "Folders cannot be renamed or moved.",//MinoObject.doSaving
				/* 47 */ "Invalid type version or type name.",//TypeVersion.initialize
				/* 48 */ "Invalid type name.",//TypeVersion.initialize
				/* 49 */ "Invalid type name. You may only create types for you own username.",//TypeVersion.initialize
				/* 50 */ "Internal save error 5.",//SaveTypeRequestHandler.process (CAUSED BY ERROR SAVING NEW TYPE VERSION)
				/* 51 */ "This type is required by __Required By__.",//TypeVersion.checkValidityOfItem
				/* 52 */ "Invalid email or username.",
				/* 53 */ "Invalid format for a username.",//NewUserHandler.handle Privilege.Privilege TypePrivilege.TypePrivilege
				/* 54 */ "Invalid format for an email address.",//NewUserRequestHandler.handle EmailField.checkValidity
				/* 55 */ "Invalid format for field name.",//MinoField.createField
				/* 56 */ "Field name already exists.",//MinoField.createField
				/* 57 */ "Invalid search parameter.",//NumberField.NumberField (CAUSED BY USING A PARAMETER WHICH IS VALID FOR TYPE CREATION, BUT NOT FOR SEARCHING)
				/* 58 */ "UNUSED ERROR.",//SearchTypesRequestHandler.process
				/* 59 */ "Invalid format for an object name.",//MinoObject.MinoObject
				/* 60 */ "Invalid format for privilege.",//Common.splitAndCheckValidPrivilegeStringForUsername
				/* 61 */ "Version number is not current or next version.",//TypeVersion
				/* 62 */ "Type version does not contain a field with this name.",//SearchRequestHandler.typeVersionAvailable
				/* 63 */ "At least one of 'IDs Allowed' and 'Paths Allowed' must be set.",//LinkField.LinkField
				/* 64 */ "'Child Of' may only be used if the field accepts paths.",//LinkField.LinkField
				/* 65 */ "Invalid field parameter.",//LinkField.LinkField (CAUSED BY USING A PARAMETER WHICH IS VALID FOR SEARCHING, BUT NOT FOR TYPE CREATION)
				/* 66 */ "Invalid path for this field's parameters.",//LinkField.checkValidity
				/* 67 */ "Privleges may only be added for your own user folder.",//Common.splitAndCheckValidPrivilegeStringForUsername
				/* 68 */ "To set array sizes 'Array' must be set to true.",//MinoField.createField
				/* 69 */ "Invalid array size combination.",//MinoField.createField
				/* 70 */ "Array is smaller than __Minimum Array Size__.",//MinoField.checkFieldInFieldMap
				/* 71 */ "Array is larger than __Maximum Array Size__.",//MinoField.checkFieldInFieldMap
				/* 72 */ "Invalid date format. Valid format is YYYY-MM-DD.",//DateField.DateField
				/* 73 */ "Date is earlier than __Earliest__.",//DateField.checkValidity
				/* 74 */ "Date is later than __Latest__.",//DateField.checkValidity
				/* 75 */ "You cannot grant privileges to this Folder.",//Privilege.Privilege
				/* 76 */ "User does not exist.",//Privilege.reportUserExistance ChangePasswordRequestHandler.process StartPasswordResetRequestHandler.process
				/* 77 */ "You cannot grant access to yourself.",//Privilege.Privilege TypePrivilege.TypePrivilege
				/* 78 */ "Invalid choice.",//ChoiceField.checkValidity ChoiceField.ChoiceField
				/* 79 */ "Multiple objects with this ID.",//MinoObject.MinoObject DeleteObject.DeleteObject
				/* 80 */ "Object does not exist or you do not have permission to modify it.",
				/* 81 */ "Invalid date.",//DateField.DateField
				/* 82 */ "This object is protected and cannot be modified.",//MinoObject.MinoObject
				/* 83 */ "UNUSED ERROR.",
				/* 84 */ "Multiple references to this privilege.",//RemovePrivilege.RemovePrivilege
				/* 85 */ "UNUSED ERROR.",
				/* 86 */ "Invalid field name. Must either be an object property or a specific Field in a TypeVersion.",//SearchRequestHandler.process
				/* 87 */ "Invalid format for URL.",//URLField.URLField
				/* 88 */ "URL does not have required prefix.",//URLField.checkValidity
				/* 89 */ "Types require at least 1 field.",//TypeVersion.TypeVersion
				/* 90 */ "You have exceeded the maximum number of messages that may be sent in one request.",//SendMessagesRequestHandler.process


				/* 93 */ "Invalid format for item path.",//Common.itemPathLevels Common.splitItemPath



				/* 97 */ "You cannot change an object between an item and a folder.",//SaveRequestHandler.process


				/* 100 */ "'Starting Index' must be at least zero.",//SearchRequestHandler.process
				/* 101 */ "'Result Size' must be at least 1 and no more than 1000.",//SearchRequestHandler.process
				/* 102 */ "Invalid token.",//CheckTokenRequestHandler.process
				/* 103 */ "Deleting-related.",//MinoObject.doSaving
				/* 104 */ "A conflicting Item is currently being saved.",//MinoObject.doSaving
				/* 105 */ "This folder contains objects.",//DeleteObject.doDelete



				/* 109 */ "Decryption Error.",//Crypt.decrypt
				/* 110 */ "Counters cannot be used in arrays.",//MinoField.createField
				/* 111 */ "Counters cannot be empty.",//MinoField.createField
				/* 112 */ "Invalid format for counter address.",//Common.idFromCounterAddress
				/* 113 */ "Invalid format for counter change.",//CounterRequestHandler.process
				/* 114 */ "Counter does not exist or you are not permitted to access it.",//CounterRequestHandler.process
				/* 115 */ "Counters may only have positive values.",//CounterField.checkValidity
				/* 116 */ "This Object has been moved.",//DeleteObject.doSaving
				/* 117 */ "Item paths cannot create child paths.",//Path.pathForChildWithName
				/* 118 */ "Privilege does not exist.",//RemovePrivilege.checkExistance
				/* 119 */ "This privilege is read only.",//RemovePrivilege.checkExistance
				/* 120 */ "You cannot grant access to this TypeVersion.",//TypePrivilege.TypePrivilege
				/* 121 */ "Type Version does not exist.",//TypePrivilege.typeVersionNotAvailable
				/* 122 */ "Email address does not have required domain name.",//EmailField.checkValidity
				/* 123 */ "Invalid format for a domain.",//EmailField.EmailField
				/* 124 */ "Session error.",//APIHandler.handle
				/* 125 */ "You cannot grant write privileges publicly.",//Privilege.Privilege
				/* 126 */ "Resulting 'Full Path' exceeds "+Common.maximumAllowedPathLength+" characters.",//MinoObject.MinoObject
				/* 127 */ "At least one of 'Items Allowed' and 'Folders Allowed' must be set.",//LinkField.LinkField
				/* 128 */ "Invalid password format.",//ChangePasswordRequestHandler.process
				/* 129 */ "Old password is not valid.",//ChangePasswordRequestHandler.process
				/* 130 */ "Array fields cannot be sorted by.",//SearchRequestHandler.process
				/* 131 */ "Field does not exist in the specified Type Version.",//SearchRequestHandler.process
				/* 132 */ "Email address is already in use.",//NewUserRequestHandler.process
				/* 133 */ "Invalid latitude. Range is -90 to +90.",//Location.Location
				/* 134 */ "Invalid longitude. Range is -180 to +180.",//Location.Location
				/* 135 */ "Distance cannot be negative.",//Location.Location
				/* 136 */ "Invalid date time format. Valid format is YYYY-MM-DD HH:MM:SS",//DateTimeField.checkValidity
				/* 137 */ "To specify 'Allow Subfolders', 'Previous Path' must be set.",//MinoObject.MinoObject
				/* 138 */ "Invalid version number.",//MinoObject.MinoObject DeleteVersionsRequestHandler.process
				/* 139 */ "Conditions cannot be used in object creation.",//MinoObject.MinoObject
				/* 140 */ "Condition void as 'Allow move' is set to false.",//MinoObject.MinoObject
				/* 141 */ "Path and name modification not permitted in conditions.",//MinoObject.doSaving
				/* 142 */ "Previous path does not meet conditions.",//MinoObject.doSaving
				/* 143 */ "Object may have been modified since specified version.",//MinoObject.doSaving
				/* 144 */ "Invalid numerical value.",//NumberField.checkValidity
				/* 145 */ "Invalid username or email address.",//StartPasswordResetRequestHandler.process

				/* 147 */ "User has not granted privileges for this function.",//ThirdPartyRequestHandler.process
				/* 148 */ "Descriptions cannot be longer than 200 characters.",//MinoField.createField TypeVersion.TypeVersion
				/* 149 */ "Invalid Sort Order. Order can either be 'Ascending' or 'Descending'.",//SearchRequestHandler.process
				/* 150 */ "'Starting Version' cannot be greater than the current version (__Current Version__).",//GetVersionListRequestHandler.process
				/* 151 */ "The number of objects to delete exceeds the limit of 1000.",//DeleteRequestHandler.process
				/* 152 */ "The number of addresses to get exceeds the limit of 1000.",//GetRequestHandler.process
				/* 153 */ "The number of versions to delete exceeds the limit of 1000.",//DeleteVersionsRequestHandler.process
				/* 154 */ "The latest version of an object cannot be deleted until the object has been deleted.",//DeleteVersionsRequestHandler.process
				/* 155 */ "This request has failed the Retransmission Prevention Mechanism which exists to prevent requests being resubmitted by a third party.",//APIHandler
				/* 156 */ "The time sent with the request is out by more than 12 hours.",//APIHandler
				/* 157 */ "Condition field(s) present alongside search parameters.",//Condition
				/* 158 */ "Invalid operator.",//Condition
				/* 159 */ "You do not have any units left to pay for this request.",//APIHandler.handle
				/* 160 */ "At least one choice is required.",//ChoiceField,
				/* 161 */ "The API request timed out. The timeout is 5000 milliseconds.",//ThirdPartyRequestHandler.process
				/* 162 */ "'Audible' cannot be set to true if neither 'Description' or 'Script' are set.",//NotifyRequestHandler.process
				/* 163 */ "'Conditional Alert' cannot be used if neither 'Description' or 'Script' are set.",//NotifyRequestHandler.process
				/* 164 */ "'Script' cannot be used if 'Description' is set.",//NotifyRequestHandler.process
				/* 165 */ "'Merge String' cannot be used if both 'Script' and 'Description' are not set.",//NotifyRequestHandler.process
				/* 166 */ "'Script' cannot be used if 'Merge String' is not set.",//NotifyRequestHandler.process
				/* 167 */ "Your Username plus 'Merge String' cannot be longer than "+(Common.maximumAllowedMergeStringLength-1)+" characters.",//NotifyRequestHandler.process
				/* 168 */ "Invalid Conditional Alert string.",//NotificationUser.respondToConditionalAlert
				/* 169 */ "Conditional Alert with that ID not found.",//NotificationUser.respondToConditionalAlert
				/* 170 */ "'Sort Order' cannot be used if 'Sort By' is not set.",//SearchRequestHandler.process
				/* 171 */ "Invalid JSON object syntax.",//TreeField.checkValidity
				/* 172 */ "UNUSED ERROR",
				/* 173 */ "'Conditions' are not present.",//Condition.Condition
				/* 174 */ "Invalid date time.",//DateTimeField.DateTimeField
				/* 175 */ "Path is not a child of __Child Of__.",//LinkField.checkValidity
				/* 176 */ "'Child Of' cannot be used if 'Paths Allowed' is not set to true.",//LinkField.LinkField
				/* 177 */ "Invalid password.",//CheckPasswordRequestHandler.process
				/* 178 */ "Invalid Path for a Folder.",//LinkField.process
				/* 179 */ "Session ID does not exist.",//SignOutRequestHandler
				/* 180 */ "Version number provided is not the next version.",//TypeVersion
				/* 181 */ "The revised field has a different field type. The existing type is __Existing Field Type__.",//TypeComparer
				/* 182 */ "The revised field's 'Array' value must match the existing one. The existing value is __Existing Array Value__.",//TypeComparer
				/* 183 */ "This field is deprecated. It cannot be saved.",//ValueField
				/* 184 */ "The specified Type does not exist.",//TypeVersion
		};
		
		ValidatorError.extendErrors(extendedErrorStrings);
	}
}
