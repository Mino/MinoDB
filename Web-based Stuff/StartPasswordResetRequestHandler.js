package requestHandlers.account;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import org.json.JSONArray;
import org.json.JSONObject;

import com.couchbase.client.CouchbaseClient;

import Models.User;

import requestHandlers.RequestHandler;
import requestHandlers.base.SaveRequestHandler;

import minocloud.serverdaemon.ServerDaemon;

import minocloud.validator.ValidatorError;
import minocloud.validator.Validator;

import common.Common;

import dataRetrieval.CouchbasePool;
import minocloud.email.SendEmail;


public class StartPasswordResetRequestHandler extends RequestHandler {

	public StartPasswordResetRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);
	}

	@Override
	public JSONObject process() throws ValidatorError {

		String userRecord = null;
		try{
			String userInput = Validator.fieldString("User Input", parameters, this, true);
			if(userInput!=null){
				if(Common.isValidUsername(userInput)){
					Future<Object> lowerCaseUserFromMembaseFuture = CouchbasePool.getInstance().getCache().asyncGet(CouchbasePool.toKVLowercaseUsernameKey(userInput));
					String caseSensitiveUserRecord = (String)lowerCaseUserFromMembaseFuture.get();
					if(caseSensitiveUserRecord!=null){
						Future<Object>userFromMembaseFuture = CouchbasePool.getInstance().getCache().asyncGet(CouchbasePool.toKVUsernameKey(caseSensitiveUserRecord));
						userRecord = (String)userFromMembaseFuture.get();
					}
				} else if(Common.isValidEmailAddress(userInput)){

					Future<Object> emailFromMembaseFuture = CouchbasePool.getInstance().getCache().asyncGet(CouchbasePool.toKVEmailKey(userInput));
					String usernameFromEmail = (String)emailFromMembaseFuture.get();

					if(usernameFromEmail==null){
						this.getOrMakeInvalid().put("User Input", new ValidatorError(76).error);
					} else {
						Future<Object> userFromMembaseFuture = CouchbasePool.getInstance().getCache().asyncGet(CouchbasePool.toKVUsernameKey(usernameFromEmail));
						userRecord = (String)userFromMembaseFuture.get();
					}

				} else {
					this.getOrMakeInvalid().put("User Input", new ValidatorError(145).error);
				}

			}
			Validator.finalErrorCheck(parameters, this);

			if(userRecord==null){
				this.getOrMakeInvalid().put("User Input", new ValidatorError(76).error);
			} else {

				JSONArray savingItemList = new JSONArray();

				JSONObject userJSON = new JSONObject(userRecord);
				String userEmail = userJSON.getString("Email");;
				String userRecordName = userJSON.getString("Username");
				String resetKey = Common.generateRandomAlphanumeric(32);

				JSONObject resetItem = new JSONObject();
				resetItem.put("Name", "Reset ~ID~");
				resetItem.put("Folder",false);
				resetItem.put("Path", "/Mino/Password Reset Requests/"+userRecordName+"/");
				JSONObject resetObj = new JSONObject();
				resetObj.put("Username", userRecordName);
				resetObj.put("Used", false);
				resetObj.put("Key", resetKey);
				resetItem.put("Mino.PasswordResetKey.1", resetObj);
				savingItemList.put(resetItem);

				CouchbaseClient client = CouchbasePool.getInstance().getCache();
				User minoUser = new User("Mino",client);
				SaveRequestHandler itemSRH = new SaveRequestHandler(minoUser, null);
				JSONObject savingResult = itemSRH.processWithoutChecks(savingItemList);

				Long savedID = null;
				try{
					JSONArray savedObjects = savingResult.getJSONArray("Objects");
					JSONObject savedToken = savedObjects.getJSONObject(0);
					savedID = new Long(savedToken.getLong("ID"));
				} catch (Exception e){
					ServerDaemon.error(e);
					throw new ValidatorError(5);
				}
				
				
				String emailDomain = "?";
				String[] emailSplit = userEmail.split("@");
				if(emailSplit.length==2){
					emailDomain = emailSplit[1];
				} else {
					ServerDaemon.error(new ValidatorError(5));
				}

				JSONObject responseObj = new JSONObject();
				responseObj.put("Sent",true);
				responseObj.put("Email Domain",emailDomain);

				String emailTo = userEmail;
				String emailFrom = "no-reply@minocloud.com";
				String emailSubject = "MinoCloud Password Reset Request";
				String emailText = "You have received this email because either yourself or someone else has initiated the password reset procedure for your MinoCloud account using the Password Reset page on MinoCloud.com."+
						SendEmail.newLine+SendEmail.newLine+
						"Click the link below or paste it into your address bar to reset your password or ignore this email if you do not wish to reset your password. The link will become inactive after 24 hours."+
						SendEmail.newLine+SendEmail.newLine+
						"http://minocloud.com/account/passwordreset.php?resetid="+savedID+"&resetkey="+resetKey+
						SendEmail.newLine+SendEmail.newLine+
						"Thank you";

				String emailHTML = "<p>"+
						"You have received this email because either yourself or someone else has initiated the password reset procedure for your MinoCloud account using the Password Reset page on MinoCloud.com."+
						"</p><p>"+
						"Click the link below or paste it into your address bar to reset your password or ignore this email if you do not wish to reset your password. The link will become inactive after 24 hours."+
						"</p>"+ 
						"<a href=\"http://minocloud.com/account/passwordreset.php?resetid="+savedID+"&resetkey="+resetKey+"\">"+
						"http://minocloud.com/account/passwordreset.php?resetid="+savedID+"&resetkey="+resetKey+"</a>"+
						"<p>"+
						"Thank you."+
						"</p>";

				try {
					SendEmail.sendEmail(emailFrom, emailTo, emailSubject, emailText, emailHTML);
				} catch (IOException e) {
					ServerDaemon.error(e);
				}

				return responseObj;
			}
			Validator.finalErrorCheck(parameters, this);


		} catch (InterruptedException e) {
			ServerDaemon.error(e);
		} catch (ExecutionException e) {
			ServerDaemon.error(e);
		}

		throw new ValidatorError(5);

	}

}