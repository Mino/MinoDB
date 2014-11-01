package requestHandlers.account;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import net.spy.memcached.MemcachedClient;
import net.spy.memcached.internal.OperationFuture;

import org.json.JSONArray;
import org.json.JSONObject;

import com.couchbase.client.CouchbaseClient;

import Models.User;

import requestHandlers.RequestHandler;
import requestHandlers.base.SaveRequestHandler;

import main.APIRole;
import main.Main;
import minocloud.api.Crypt;
import minocloud.serverdaemon.ServerDaemon;

import usage.UsageCompiler;
import minocloud.validator.ValidatorError;
import minocloud.validator.Validator;

import common.Common;

import dataRetrieval.CouchbasePool;
import dataRetrieval.IDPool;
import minocloud.email.SendEmail;

public class NewUserRequestHandler extends RequestHandler {

	public String thisNewUsername;

	public NewUserRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);
	}

	@Override
	public JSONObject process() throws ValidatorError {

		Boolean isASubUser = Validator.fieldBoolean("Sub User", parameters, this, true);

		String thisNewUsername = Validator.fieldString("Username", parameters, this, true);
		if(thisNewUsername!=null){
			if(!Common.isValidUsername(thisNewUsername)){
				this.getOrMakeInvalid().put("Username", new ValidatorError(53).error);
			}
			if(isASubUser!=null && isASubUser==false){
				if(Common.isValidNewUsername(thisNewUsername)){
					this.getOrMakeInvalid().put("Username", new ValidatorError(53).error);
				}
			}
		}
		String email = Validator.fieldString("Email", parameters, this, true);
		if(email!=null){
			if(!Common.isValidEmailAddress(email)){
				this.getOrMakeInvalid().put("Email", new ValidatorError(54).error);
			}
		}
		String password = Validator.fieldString("Password", parameters, this, true);
		if(password!=null){
			if(!Common.isValidPassword(password)){
				this.getOrMakeInvalid().put("Password", new ValidatorError(128).error);
			}
		}
		Validator.finalErrorCheck(parameters, this);


		String emailKey = CouchbasePool.toKVEmailKey(email);
		String lowerUsernameKey = CouchbasePool.toKVLowercaseUsernameKey(thisNewUsername);
		String usernameKey = CouchbasePool.toKVUsernameKey(thisNewUsername);
		String usernameUnitsKey = CouchbasePool.toKVUsernameUnitsRemainingKey(thisNewUsername);
		String lastCompiledTimeKey = CouchbasePool.toKVLastCompiledTime(thisNewUsername);

		String apiKey = Common.generateRandomAlphanumeric(32);

		String systemAPIKey = Main.apiKeys.getString(thisNewUsername);
		if(systemAPIKey!=null){
			apiKey = systemAPIKey;
		}

		String salt = Common.generateRandomAlphanumeric(32);
		JSONObject newUser = new JSONObject();
		newUser.put("Username", thisNewUsername);
		newUser.put("Password", Crypt.encryptPassword(password + salt));
		newUser.put("Salt", salt);
		newUser.put("API Key", apiKey);
		newUser.put("Email", email);
		newUser.put("Created", Common.getDateTimeString(Common.SECONDSDATEFORMAT));

		Future<Boolean> addLowerUsername = client.add(lowerUsernameKey,0,thisNewUsername);
		Future<Boolean> addEmailFuture = client.add(emailKey, 0, thisNewUsername);
		Future<Boolean> addUsernameKeyFuture = client.add(usernameKey, 0, newUser.toString());
		Future<Boolean> addUnitsKeyFuture = client.add(usernameUnitsKey, 0, "0");

		//It doesn't matter if this key is persisted even if the account doesn't get saved.
		client.add(lastCompiledTimeKey, 0, Common.getDateTimeString(Common.MINUTESDATEFORMAT));

		boolean success = false;
		try {
			boolean lowerUsernameSuccess = addLowerUsername.get();
			boolean usernameSuccess = addUsernameKeyFuture.get() && addUnitsKeyFuture.get();
			boolean emailSuccess = addEmailFuture.get();
			success = emailSuccess && usernameSuccess && lowerUsernameSuccess;
			if(!(lowerUsernameSuccess)){
				this.getOrMakeInvalid().put("Username", new ValidatorError(33).error);//Same error as username existing
				if(emailSuccess){
					client.delete(emailKey);
				}
				if(usernameSuccess){
					client.delete(usernameKey);
					client.delete(usernameUnitsKey);
					client.delete(lastCompiledTimeKey);
				}
			}
			if(!(usernameSuccess)){
				this.getOrMakeInvalid().put("Username", new ValidatorError(33).error);
				if(emailSuccess){
					client.delete(emailKey);
				}
			}
			if(!(emailSuccess)){
				this.getOrMakeInvalid().put("Email", new ValidatorError(132).error);
				if(usernameSuccess){
					client.delete(usernameKey);
					client.delete(usernameUnitsKey);
					client.delete(lastCompiledTimeKey);
				}
				if(lowerUsernameSuccess){
					client.delete(lowerUsernameKey);
				}
			}
		} catch (InterruptedException e) {
			ServerDaemon.error(e);
			throw new ValidatorError(5);
		} catch (ExecutionException e) {
			ServerDaemon.error(e);
			throw new ValidatorError(5);
		}

		Validator.finalErrorCheck(null, this);

		if(success){

			JSONObject didSave = new JSONObject();
			didSave.put("Created", true);

			try{

				CouchbasePool.setSearchClusterForUser(thisNewUsername, ServerDaemon.firstClusterName);

				String createdTime = Common.getDateTimeString(Common.SECONDSDATEFORMAT);


				/* This folder can't be created using the normal save procedure because 
				 * it has no parent. 
				 */
				{
					//Add user folder
					long folderID = IDPool.getIDs(1)[0];
					String name = thisNewUsername;
					String path = "/";
					String fullPath = path+name+"/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("ID", folderID);
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Full Path", fullPath);
					folderObj.put("Folder",true);
					folderObj.put("Created",createdTime);
					folderObj.put("Last Updated",createdTime);
					folderObj.put("Version",1);

					String compiledObj = folderObj.toString();

					ArrayList<OperationFuture<Boolean>> boolFutures = new ArrayList<OperationFuture<Boolean>>();
					ArrayList<OperationFuture<Long>> longFutures = new ArrayList<OperationFuture<Long>>();
					
					boolFutures.add(client.add(CouchbasePool.toKVIDVersionKey(folderID+"/1"), 0, compiledObj));
					boolFutures.add(client.add(CouchbasePool.toKVIDKey(folderID), 0, Common.buildIDValueFromIDVersionPathAndCreated(""+folderID+"/1", fullPath, createdTime)));
					boolFutures.add(client.add(CouchbasePool.toKVPathKey(fullPath), 0, ""+folderID+"/1"));
					boolFutures.add(client.add(CouchbasePool.toKVIDNextKey(folderID), 0, "1"));
					longFutures.add(client.asyncIncr(CouchbasePool.toKVChildCountKey(path), 1));
					boolFutures.add(client.add(CouchbasePool.toKVChildCountKey(fullPath), 0, "0"));
					
					for(OperationFuture<Boolean> fut : boolFutures){
						Boolean got = fut.get();
						if(got==null || got!=true){
							ServerDaemon.error(new Exception("A boolean future did not return true: "+fut.getKey()));
						}
					}
					
					for(OperationFuture<Long> fut : longFutures){
						Long got = fut.get();
						if(got==null){
							ServerDaemon.error(new Exception("A long future did not return a long: "+fut.getKey()));
						}
					}
				}

				JSONArray saveObjects = new JSONArray();

				{
					//Add applications folder
					String name = "Apps";
					String path = "/"+thisNewUsername+"/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				{
					String name = "Type Privileges";
					String path = "/"+thisNewUsername+"/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				{
					//Add App Privileges folder
					String name = "App Privileges";
					String path = "/"+thisNewUsername+"/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				{
					//Add privileges folder
					String name = "Privileges";
					String path = "/"+thisNewUsername+"/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				if(thisNewUsername.equals("Mino")){
					//THIS IS ONLY FOR THE "Mino" user
					//CREATE THE STANDARD FOLDERS

					{
						//Add users directory
						String name = "Users Directory";
						String path = "/Mino/";

						JSONObject folderObj = new JSONObject();
						folderObj.put("Name", name);
						folderObj.put("Path", path);
						folderObj.put("Folder",true);

						saveObjects.put(folderObj);
					}

					{
						//Add apps directory
						String name = "Apps Directory";
						String path = "/Mino/";

						JSONObject folderObj = new JSONObject();
						folderObj.put("Name", name);
						folderObj.put("Path", path);
						folderObj.put("Folder",true);

						saveObjects.put(folderObj);
					}

					{
						//Add Sessions directory
						String name = "Sessions Directory";
						String path = "/Mino/";

						JSONObject folderObj = new JSONObject();
						folderObj.put("Name", name);
						folderObj.put("Path", path);
						folderObj.put("Folder",true);

						saveObjects.put(folderObj);
					}

					{
						//Add Tokens directory
						String name = "Tokens Directory";
						String path = "/Mino/";

						JSONObject folderObj = new JSONObject();
						folderObj.put("Name", name);
						folderObj.put("Path", path);
						folderObj.put("Folder",true);

						saveObjects.put(folderObj);
					}

					{
						//Add Password Reset Request directory
						String name = "Password Reset Requests";
						String path = "/Mino/";

						JSONObject folderObj = new JSONObject();
						folderObj.put("Name", name);
						folderObj.put("Path", path);
						folderObj.put("Folder",true);

						saveObjects.put(folderObj);
					}
				}

				try{

					SaveRequestHandler srh = new SaveRequestHandler(this.minoUser,null);
					srh.processWithoutChecks(saveObjects);

				} catch (ValidatorError ve){
					ServerDaemon.error(ve);
					throw ve;
				}

				saveObjects = new JSONArray();//Empty the array and reuse

				//SECONDARY SAVES (Require earlier folders)

				{
					//Add sent folder
					String name = "Sent";
					String path = "/"+thisNewUsername+"/Type Privileges/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				{
					//Add received folder
					String name = "Received";
					String path = "/"+thisNewUsername+"/Type Privileges/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				{
					//Add personal folder
					String name = "Personal";
					String path = "/"+thisNewUsername+"/Type Privileges/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				{
					//Add sent folder
					String name = "Sent";
					String path = "/"+thisNewUsername+"/Privileges/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				{
					//Add received folder
					String name = "Received";
					String path = "/"+thisNewUsername+"/Privileges/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				{
					//Add user folder in users directory
					String name = thisNewUsername;
					String path = "/Mino/Users Directory/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				{
					//Add Sessions folder
					String name = thisNewUsername;
					String path = "/Mino/Sessions Directory/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				{
					//Add Tokens folder
					String name = thisNewUsername;
					String path = "/Mino/Tokens Directory/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				{
					//Add Password Reset Request folder
					String name = thisNewUsername;
					String path = "/Mino/Password Reset Requests/";

					JSONObject folderObj = new JSONObject();
					folderObj.put("Name", name);
					folderObj.put("Path", path);
					folderObj.put("Folder",true);

					saveObjects.put(folderObj);
				}

				try{
					SaveRequestHandler srh2 = new SaveRequestHandler(this.minoUser,null);
					srh2.processWithoutChecks(saveObjects);
				} catch (ValidatorError ve){
					ServerDaemon.error(ve);
					throw ve;
				}

				saveObjects = new JSONArray();
				{
					//Add User item

					JSONObject userItem = new JSONObject();
					userItem.put("Name", "User Information");
					String path = "/Mino/Users Directory/"+thisNewUsername+"/";
					userItem.put("Path", path);
					userItem.put("Folder",false);
					JSONObject minoUserType = new JSONObject();
					minoUserType.put("Username",thisNewUsername);
					minoUserType.put("Email",email);
					userItem.put("Mino.User.1", minoUserType);

					saveObjects.put(userItem);
				}

				try{
					SaveRequestHandler srh3 = new SaveRequestHandler(this.minoUser,null);
					srh3.processWithoutChecks(saveObjects);
				} catch (ValidatorError ve){
					ServerDaemon.error(ve);
					throw ve;
				}

				Integer[] currentDateTime = Common.splitDateFormat(Common.getDateTimeString(Common.MINUTESDATEFORMAT), Common.MINUTESDATEFORMAT);

				if(!User.isSystemUser(thisNewUsername)){//This won't work for the initial creation of any of the infrastructure users

					Common.activateCoreApps(thisNewUsername,minoUser);

					UsageCompiler usageCompiler = new UsageCompiler(thisNewUsername);
					usageCompiler.createYearFolder(currentDateTime[0]);
					usageCompiler.createMonthFolder(currentDateTime[0],currentDateTime[1]);
					usageCompiler.createDayFolder(currentDateTime[0],currentDateTime[1],currentDateTime[2]);
				}

				if(!isASubUser && !User.isSystemUser(thisNewUsername)){
					String emailTo = email;
					String emailFrom = "no-reply@minocloud.com";
					String emailSubject = "Welcome to MinoCloud";

					String emailText = "Hi "+thisNewUsername+
							SendEmail.newLine+SendEmail.newLine+
							"If you've forgotten your password just enter the address below into your web browser's address bar."+
							SendEmail.newLine+SendEmail.newLine+
							"http://minocloud.com/account/forgotdetails.php";

					String emailHTML = "<p>Hi "+thisNewUsername+"</p>"+
							"<p>"+			
							"If you've forgotten your password just click on the link below."+
							"</p>"+
							"<p>"+
							"<a href=\"http://minocloud.com/account/forgotdetails.php\">Reset Password</a>"+
							"</p>";

					try {
						SendEmail.sendEmail(emailFrom, emailTo, emailSubject, emailText, emailHTML);
					} catch (IOException e) {
						ServerDaemon.error(e);
					}
				}

			} catch (Exception e){
				ServerDaemon.error(e);
				didSave.put("Created",false);
				return didSave;
			}


			APIRole.createdUser();

			return didSave;
		}

		return new JSONObject();
	}

}