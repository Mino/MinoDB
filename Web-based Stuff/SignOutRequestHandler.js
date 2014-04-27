package requestHandlers.account;

import main.APIServer;

import notifications.send.DeliverNotificationsAction;
import notifications.send.NotificationServer;

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

public class SignOutRequestHandler extends RequestHandler{

	public SignOutRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);
	}

	@Override
	public JSONObject process() throws ValidatorError {

		String sessionID = Validator.fieldString("Session ID", parameters, this, true);
		String signOutUser = Validator.fieldString("User", parameters, this, true);
		Validator.finalErrorCheck(parameters, this);

		String sessionPath = "/Mino/Sessions Directory/"+signOutUser+"/Session "+sessionID;

		JSONObject session = Common.getObjectFromPath(sessionPath);

		if(session==null){
			this.getOrMakeInvalid().put("Session ID", new ValidatorError(179));
			Validator.finalErrorCheck(parameters, this);
		}

		
		//Make the session inactive
		session.getJSONObject("Mino.Session.1").put("Active",false);

		JSONArray savingObjects = new JSONArray();
		savingObjects.put(session);

		CouchbaseClient client = CouchbasePool.getInstance().getCache();
		User minoUser = new User("Mino",client);
		
		SaveRequestHandler srh = new SaveRequestHandler(minoUser,null);
		srh.processWithoutChecks(savingObjects);
		
		

		JSONObject notificationObj = Common.getObjectFromPath("/"+signOutUser+"/Apps/Notifications/User");

		if(notificationObj==null){
			ServerDaemon.error(new Exception());
			throw new ValidatorError(5);
		}

		JSONObject notificationUserV1 = notificationObj.getJSONObject("Notifications.User.1");
		if(notificationUserV1==null){
			ServerDaemon.error(new Exception());
			throw new ValidatorError(5);
		}

		JSONObject notification = new JSONObject();
		notification.put("SignOut",true);
		notification.put("Session ID",sessionID);

		String currentServer = notificationUserV1.getString("Server");

		NotificationServer ns = new NotificationServer(currentServer, notification);
		ns.addUser(signOutUser);

		if(ns.ip==null || ns.ip.equals("NONE")){

		} else if(ServerDaemon.getInstance().isLocalAddress(ns.ip)){
			//Handle the notifications locally using the API Server's action executor
			DeliverNotificationsAction dna = new DeliverNotificationsAction(ns.users, notification);
			APIServer.getInstance().actionExecutor.execute(dna);
		} else {
			//Send an asynchronous request to the notification server
			ns.run();
		}

		JSONObject toReturn = new JSONObject();
		toReturn.put("Successful",true);

		return toReturn;

	}

}