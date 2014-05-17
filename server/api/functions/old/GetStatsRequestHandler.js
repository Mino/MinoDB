package requestHandlers;

import java.util.ArrayList;

import net.spy.memcached.internal.GetFuture;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.RawJSON;

import Models.User;

import com.couchbase.client.CouchbaseClient;

import minocloud.serverdaemon.ServerDaemon;
import minocloud.validator.ValidatorError;


import common.Pair;

import dataRetrieval.CouchbasePool;
import dataRetrieval.IDPool;

public class GetStatsRequestHandler extends RequestHandler {

	JSONArray addressArray;
	ArrayList<Pair<String,RawJSON>> keys;// -> idVersions
	ArrayList<String> getFinalArray;

	public GetStatsRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);
	}

	@Override
	public JSONObject process() throws ValidatorError {

		JSONObject stats = new JSONObject();

		CouchbaseClient client = CouchbasePool.getInstance().getCache();
		try{
			GetFuture<Object> idsUsedFuture = client.asyncGet("IDsUsed");
			GetFuture<Object> usersFuture = client.asyncGet("Users");
			GetFuture<Object> objectsRetrieved = client.asyncGet("ObjectsRetrieved");
			GetFuture<Object> objectsDeleted = client.asyncGet("ObjectsDeleted");
			GetFuture<Object> searches = client.asyncGet("Searches");
			GetFuture<Object> notificationsFuture = client.asyncGet("NotificationsSent");
			GetFuture<Object> apiCallsFuture = client.asyncGet("APICalls");
			GetFuture<Object> appsActivatedFuture = client.asyncGet("AppsActivated");
			GetFuture<Object> appTokensSetFuture = client.asyncGet("AppTokensSet");
			GetFuture<Object> appTokensCheckedFuture = client.asyncGet("AppTokensChecked");
			GetFuture<Object> typesSavedFuture = client.asyncGet("Types Saved");
			GetFuture<Object> signinFuture = client.asyncGet("SignIns");
			
			stats.put("IDs Used",idsUsedFuture.get());
			stats.put("Users",usersFuture.get());
			stats.put("Objects Retrieved",objectsRetrieved.get());
			stats.put("Objects Deleted",objectsDeleted.get());
			stats.put("Searches Performed",searches.get());
			stats.put("Notifications Sent",notificationsFuture.get());
			stats.put("API Calls",apiCallsFuture.get());
			stats.put("Apps Activated",appsActivatedFuture.get());
			stats.put("App Tokens Set",appTokensSetFuture.get());
			stats.put("App Tokens Checked",appTokensCheckedFuture.get());
			stats.put("Types Saved",typesSavedFuture.get());
			stats.put("Sign Ins",signinFuture.get());
			
			stats.put("ID Pool", IDPool.getLastID());
		} catch (Exception e){
			ServerDaemon.error(e);
		}

		return stats;
	}

}
