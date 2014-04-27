package requestHandlers.account;

import org.json.JSONObject;

import Models.User;

import requestHandlers.RequestHandler;

import main.APIRole;
import minocloud.api.Crypt;

import minocloud.validator.ValidatorError;
import minocloud.validator.Validator;


import common.Common;

import dataRetrieval.CouchbasePool;

public class CheckPasswordRequestHandler extends RequestHandler{

	public CheckPasswordRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);
	}

	@Override
	public JSONObject process() throws ValidatorError {

		String username = null;
		JSONObject userRecord = null;
		JSONObject usernameData = null;
		
		boolean correctPass = false;

		String checkUsernameOrEmail = Validator.fieldString("Username or Email", parameters, this, true);
		if(checkUsernameOrEmail!=null){
			if(Common.isValidUsername(checkUsernameOrEmail)){
				String rawUsername = checkUsernameOrEmail;

				//If rawUsername is valid then the username will be retrieved
				username = (String)CouchbasePool.getInstance().getCache().get(CouchbasePool.toKVLowercaseUsernameKey(rawUsername));

			} else if(Common.isValidEmailAddress(checkUsernameOrEmail)){
				String rawEmail = checkUsernameOrEmail;
				username = (String)CouchbasePool.getInstance().getCache().get(CouchbasePool.toKVEmailKey(rawEmail));

			}

			if(username!=null){
				String userRecordString = (String)CouchbasePool.getInstance().getCache().get(CouchbasePool.toKVUsernameKey(username));
				userRecord = new JSONObject(userRecordString);
				usernameData = new JSONObject();
				usernameData.put("Username",username);
			} else {
				this.getOrMakeInvalid().put("Username or Email", new ValidatorError(52).error);
			}
		}
		String checkPassword = Validator.fieldString("Password", parameters, this, true);
		if(checkPassword!=null){
			if(!Common.isValidPassword(checkPassword)){
				if(username==null){
					this.getOrMakeInvalid().put("Password", new ValidatorError(128).error);
				} else {
					this.getOrMakeInvalid().put("Password", new ValidatorError(128,usernameData).error);
				}
			} else if(userRecord!=null){
				String storedSHA1WithSalt = userRecord.getString("Password");
				String storedSalt = userRecord.getString("Salt");

				String sha1edCheckPass = Crypt.encryptPassword(checkPassword + storedSalt);

				if(!storedSHA1WithSalt.equals(sha1edCheckPass)){
					if(username==null){
						this.getOrMakeInvalid().put("Password", new ValidatorError(177).error);
					} else {
						this.getOrMakeInvalid().put("Password", new ValidatorError(177,usernameData).error);
					}
				} else {
					correctPass = true;
				}
			}
		}
		Validator.finalErrorCheck(parameters, this);


		APIRole.signin();

		JSONObject response = new JSONObject();
		response.put("Valid", correctPass);
		response.put("Username", username);

		return response;

	}

}