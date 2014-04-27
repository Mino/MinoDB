package requestHandlers.account;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import net.spy.memcached.MemcachedClient;

import org.json.JSONException;
import org.json.JSONObject;

import Models.User;

import requestHandlers.RequestHandler;

import minocloud.serverdaemon.ServerDaemon;

import minocloud.validator.ValidatorError;
import minocloud.validator.Validator;


import common.Common;

import dataRetrieval.CouchbasePool;

public class APIKeyRequestHandler extends RequestHandler{

	public APIKeyRequestHandler(User user, JSONObject parameters) throws ValidatorError {
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

		Validator.fieldBoolean("Create New", parameters, this, true);
		
		Validator.finalErrorCheck(parameters, this);

		try{
			Future<Object> userFromMembaseFuture = CouchbasePool.getInstance().getCache().asyncGet(CouchbasePool.toKVUsernameKey(changeUsername));
			String userRecord = (String)userFromMembaseFuture.get();

			if(userRecord==null){
				this.getOrMakeInvalid().put("Username", new ValidatorError(76).error);
				Validator.finalErrorCheck(parameters, this);
			}

			JSONObject userJSON = new JSONObject(userRecord);

			String newAPIKey = Common.generateRandomAlphanumeric(32);
			
			userJSON.put("API Key", newAPIKey);

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
			didSave.put("API Key", newAPIKey);
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