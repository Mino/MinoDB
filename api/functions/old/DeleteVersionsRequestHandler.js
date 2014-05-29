package requestHandlers.base;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.ListIterator;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.RawJSON;

import minocloud.serverdaemon.ServerDaemon;

import Models.User;

import com.couchbase.client.CouchbaseClient;

import privileges.ObjectPrivilegeRetriever;
import privileges.PrivilegeArrayListener;
import requestHandlers.RequestHandler;
import minocloud.validator.ValidatorError;
import minocloud.validator.Validator;

import common.Common;
import common.Path;

import dataRetrieval.CouchbasePool;
import deletion.DeleteVersionRawJSON;

public class DeleteVersionsRequestHandler extends RequestHandler implements PrivilegeArrayListener{

	public static final int maximumDelete = 1000;

	String objectID;
	ObjectPrivilegeRetriever objectPrivilegeRetriever;
	ArrayList<String> getFinalArray;
	CouchbaseClient client;
	HashMap<RawJSON,Boolean> awaitingPrivileges;

	public DeleteVersionsRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);
	}

	@Override
	public JSONObject process() throws ValidatorError {
		client = CouchbasePool.getInstance().getCache();
		objectPrivilegeRetriever = new ObjectPrivilegeRetriever(this.user, this, false);

		String idObjectString = null;
		Long latestVersionNumber = null;
		Object idObject = Validator.fieldValue("ID",this.parameters,this,true);
		if(idObject!=null){
			try{
				idObjectString = Common.convertObjectToIDString(idObject);
				String idAndVersionAndCreated = (String)CouchbasePool.getInstance().getCache().get(CouchbasePool.toKVIDKey(idObjectString));

				if(idAndVersionAndCreated!=null && !idAndVersionAndCreated.equals("DELETED")){
					String[] idVersionAndCreatedSplit = Common.splitIDValueToVersionAndPathAndCreated(idAndVersionAndCreated);
					String idAndVersion = idVersionAndCreatedSplit[0];
					String[] idAndVersionSplit = idAndVersion.split("/");
					latestVersionNumber = Long.parseLong(idAndVersionSplit[1]);
				}


			} catch (ValidatorError fe){
				this.getOrMakeInvalid().put("ID",fe.error);
			}
		}


		ArrayList<String> versionKeys = new ArrayList<String>();

		JSONArray versionNumbers = Validator.fieldArray("Versions", parameters, this, true);
		if(versionNumbers!=null){
			if(versionNumbers.length()>DeleteVersionsRequestHandler.maximumDelete){
				this.getOrMakeInvalid().put("Versions",new ValidatorError(153).error);
			} else {
				JSONObject errors = new JSONObject();
				
				ListIterator<Object> iterator =  versionNumbers.listIterator();
				while(iterator.hasNext()){
					Object obj = iterator.next();
					try{
						Long thisVersionNumber = Common.convertObjectToVersionLong(obj);
						if(latestVersionNumber!=null){
							if(thisVersionNumber.longValue()>latestVersionNumber.longValue()){
								throw new ValidatorError(14);
							} else if(thisVersionNumber.longValue()==latestVersionNumber.longValue()){
								throw new ValidatorError(154);
							}
						}

						versionKeys.add(CouchbasePool.toKVIDVersionKey(idObjectString+"/"+thisVersionNumber));

					} catch (ValidatorError fe){
						errors.put(iterator.previousIndex()+"", fe.error);
					}
				}
				if(errors.length()!=0){
					JSONObject invalidHolder = new JSONObject();
					invalidHolder.put("Invalid",errors);
					this.getOrMakeInvalid().put("Versions",new ValidatorError(0,invalidHolder).error);
				}
			}
		}
		Validator.finalErrorCheck(this.parameters, this);

		Map<String,Object> versionResponse = CouchbasePool.getInstance().getCache().getBulk(versionKeys);

		JSONObject returningVersions = new JSONObject();

		String errorString = new ValidatorError(14).error.toString();

		int idStringLength = idObjectString.length();
		try{
			for(String versionNumberKeyKV : versionKeys){

				DeleteVersionRawJSON rj = new DeleteVersionRawJSON(errorString,versionNumberKeyKV);
				returningVersions.put(versionNumberKeyKV.substring(2+idStringLength), rj);

				String versionAsString = (String)versionResponse.get(versionNumberKeyKV);
				if(versionAsString!=null){
					JSONObject versionContents = new JSONObject(versionAsString);
					Path versionFullPath = new Path(versionContents.getString("Full Path"));
					this.objectPrivilegeRetriever.addPathForObject(versionFullPath, rj);
				}
			}
		} catch (Exception e){
			ServerDaemon.error(e);
		}

		this.objectPrivilegeRetriever.run();

		JSONObject result = new JSONObject();
		result.put("Versions",returningVersions);
		return result;
	}

	@Override
	public void privilegeArrayAvailable(ArrayList<Object> array) {

		for(Object obj : array){
			DeleteVersionRawJSON rj = (DeleteVersionRawJSON)obj;
			rj.setString("true");
			client.delete(rj.versionNumberKey);
		}
	}

	@Override
	public void endOfPrivileges() {

	}
}
