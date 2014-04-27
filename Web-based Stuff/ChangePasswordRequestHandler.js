package requestHandlers.account;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import net.spy.memcached.MemcachedClient;

import org.json.JSONException;
import org.json.JSONObject;

import Models.User;

import requestHandlers.RequestHandler;

import minocloud.api.Crypt;
import minocloud.serverdaemon.ServerDaemon;

import minocloud.validator.ValidatorError;
import minocloud.validator.Validator;


import common.Common;

import dataRetrieval.CouchbasePool;
import minocloud.email.SendEmail;

public class ChangePasswordRequestHandler extends RequestHandler{

	public ChangePasswordRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);
	}

	@Override
	public JSONObject process() throws ValidatorError {

		String changeUsername = Validator.fieldString("Username", parameters, this, true);
		if(changeUsername!=null){
			if(!Common.isValidUsername(changeUsername)){
				this.getOrMakeInvalid().put("Username", new ValidatorError(53).error);
			}
		}
		String newPassword = Validator.fieldString("New Password", parameters, this, true);
		if(newPassword!=null){
			if(!Common.isValidPassword(newPassword)){
				this.getOrMakeInvalid().put("New Password", new ValidatorError(128).error);
			}
		}

		//Old password not required (but will be checked if provided)
		String oldPassword = Validator.fieldString("Old Password", parameters, this, false);

		Validator.finalErrorCheck(parameters, this);

		try{
			Future<Object> userFromMembaseFuture = CouchbasePool.getInstance().getCache().asyncGet(CouchbasePool.toKVUsernameKey(changeUsername));
			String userRecord = (String)userFromMembaseFuture.get();

			if(userRecord==null){
				this.getOrMakeInvalid().put("Username", new ValidatorError(76).error);
				Validator.finalErrorCheck(parameters, this);
			}

			JSONObject userJSON = new JSONObject(userRecord);

			String retrievedPasswordSHA1 = userJSON.getString("Password");
			String retrievedSalt = userJSON.getString("Salt");

			if(oldPassword!=null){
				String oldPasswordSHA1 = Crypt.encryptPassword(oldPassword + retrievedSalt);
			
				if(!retrievedPasswordSHA1.equals(oldPasswordSHA1)){
					this.getOrMakeInvalid().put("Old Password", new ValidatorError(129).error);
					Validator.finalErrorCheck(parameters, this);
				}
			}
			String salt = Common.generateRandomAlphanumeric(32);
			userJSON.put("Password", Crypt.encryptPassword(newPassword + salt));
			userJSON.put("Salt", salt);

			MemcachedClient client = CouchbasePool.getInstance().getCache();

			Future<Boolean> f = client.set(CouchbasePool.toKVUsernameKey(changeUsername), 0, userJSON.toString());

			boolean success = false;
			try {
				success = f.get();
			} catch (InterruptedException e) {
				ServerDaemon.error(e);
			} catch (ExecutionException e) {
				ServerDaemon.error(e);
			}

			if(!success){
				this.getOrMakeInvalid().put("Username", new ValidatorError(33).error);
				Validator.finalErrorCheck(parameters, this);
			}

			JSONObject didSave = new JSONObject();
			didSave.put("Success", true);


			String emailTo = userJSON.getString("Email");
			String emailFrom = "no-reply@minocloud.com";
			String emailSubject = "MinoCloud Password Changed";
			String emailText = "Your MinoCloud account password has just been changed."+
					SendEmail.newLine+SendEmail.newLine+
					"If you did not authorize this password change, please reset your password immediately."+
					SendEmail.newLine+SendEmail.newLine+
					"Thank you.";


			String emailHTML = "<p>"+
					"Your MinoCloud account password has just been changed."+
					"</p><p>"+
					"If you did not authorize this password change, please reset your password immediately."+
					"</p><p>"+
					"Thank you."+
					"</p>";

			try {
				SendEmail.sendEmail(emailFrom, emailTo, emailSubject, emailText, emailHTML);
			} catch (IOException e) {
				ServerDaemon.error(e);
			}

			return didSave;

		} catch (JSONException je){
			ServerDaemon.error(je);
		} catch (InterruptedException e) {
			ServerDaemon.error(e);
		} catch (ExecutionException e) {
			ServerDaemon.error(e);
		}

		throw new ValidatorError(5);

	}

}