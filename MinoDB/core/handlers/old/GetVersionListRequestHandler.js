package requestHandlers.base;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.json.RawJSON;

import Models.User;

import minocloud.serverdaemon.ServerDaemon;

import privileges.ObjectPrivilegeRetriever;
import privileges.PrivilegeArrayListener;
import requestHandlers.RequestHandler;
import minocloud.validator.ValidatorError;
import minocloud.validator.Validator;

import common.Common;
import common.Path;

import dataRetrieval.CouchbasePool;

public class GetVersionListRequestHandler extends RequestHandler implements PrivilegeArrayListener{

	String objectID;
	ObjectPrivilegeRetriever objectPrivilegeRetriever;
	ArrayList<String> getFinalArray;
	HashMap<RawJSON,Boolean> awaitingPrivileges;

	public GetVersionListRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);
	}

	@Override
	public JSONObject process() throws ValidatorError {
		
		objectPrivilegeRetriever = new ObjectPrivilegeRetriever(this.user, this, false);

		Integer startingVersion = Validator.fieldInteger("Starting Version", parameters, this, false);
		if(startingVersion!=null){
			if(startingVersion<1){
				this.getOrMakeInvalid().put("Starting Version",new ValidatorError(37).error);
			}
		} else {
			startingVersion = 1;
		}

		Integer resultSize = Validator.fieldInteger("Result Size", parameters, this, false);
		if(resultSize!=null){
			if(resultSize<1){
				this.getOrMakeInvalid().put("Result Size",new ValidatorError(101).error);
			}
		} else {
			resultSize = 100;
		}

		String idObjectString = null;
		Object idObject = Validator.fieldValue("ID",this.parameters,this,true);
		if(idObject!=null){
			try{
				idObjectString = Common.convertObjectToIDString(idObject);
			} catch (ValidatorError fe){
				this.getOrMakeInvalid().put("ID",fe.error);
			}
		}
		Validator.finalErrorCheck(this.parameters, this);

		String idAndVersionAndCreated = (String)CouchbasePool.getInstance().getCache().get(CouchbasePool.toKVIDKey(idObjectString));

		if(idAndVersionAndCreated==null || idAndVersionAndCreated.equals("DELETED")){
			this.getOrMakeInvalid().put("ID",new ValidatorError(14).error);
			Validator.finalErrorCheck(this.parameters, this);
		}

		String[] idVersionAndCreatedSplit = Common.splitIDValueToVersionAndPathAndCreated(idAndVersionAndCreated);
		String idAndVersion = idVersionAndCreatedSplit[0];
		String[] idAndVersionSplit = idAndVersion.split("/");
		Long versionNumber = Long.parseLong(idAndVersionSplit[1]);

		if(startingVersion>versionNumber){
			this.getOrMakeInvalid().put("Starting Version",new ValidatorError(150,new JSONObject().put("Current Version", versionNumber)).error);
			Validator.finalErrorCheck(this.parameters, this);
		}

		long maximumCheck = startingVersion + resultSize - 1;
		if(maximumCheck > versionNumber){
			maximumCheck = versionNumber;
		}

		ArrayList<String> versionKeys = new ArrayList<String>();

		for(int i = startingVersion; i<=maximumCheck; i++){
			versionKeys.add(CouchbasePool.toKVIDVersionKey(idObjectString+"/"+i));
		}

		Map<String,Object> versionResponse = CouchbasePool.getInstance().getCache().getBulk(versionKeys);

		JSONObject returningVersions = new JSONObject();

		int idStringLength = idObjectString.length();
		try{
			for(String versionNumberKeyKV : versionKeys){

				RawJSON rj = new RawJSON("false");
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
		result.put("Current Version",versionNumber);
		result.put("Versions",returningVersions);
		return result;
	}

	@Override
	public void privilegeArrayAvailable(ArrayList<Object> array) {

		for(Object obj : array){
			RawJSON rj = (RawJSON)obj;
			rj.setString("true");
		}
	}

	@Override
	public void endOfPrivileges() {

	}
}
