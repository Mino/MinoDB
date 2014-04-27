package requestHandlers.privileges;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.ListIterator;
import java.util.Map;
import java.util.Map.Entry;

import net.spy.memcached.MemcachedClient;

import org.json.JSONArray;
import org.json.JSONObject;

import Models.User;

import common.Pair;

import privileges.Privilege;
import privileges.RemovePrivilege;
import requestHandlers.RequestHandler;
import requestHandlers.base.DeleteRequestHandler;
import minocloud.validator.ValidatorError;
import minocloud.validator.Validator;
import minocloud.validator.ValidatorObject;
import dataRetrieval.CouchbasePool;
import dataRetrieval.UserExistanceChecker;

public class RemovePrivilegesRequestHandler extends RequestHandler {
	
	public static int maximumAdd = 10;
	public UserExistanceChecker userExistanceChecker;
	public int totalSaving = 0;
	public int newIDs = 0;
	private JSONArray deletePaths;
	ValidatorObject privilegeVO = null;	
	public HashMap<String,Pair<RemovePrivilege,String>> itemPathsForRemoveObjects;

	public RemovePrivilegesRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);

	}
	
	@Override
	public JSONObject process() throws ValidatorError {

		userExistanceChecker = new UserExistanceChecker();
		
		itemPathsForRemoveObjects = new HashMap<String,Pair<RemovePrivilege,String>>();
		
		ArrayList<RemovePrivilege> removingPrivileges = new ArrayList<RemovePrivilege>();
		
		deletePaths = new JSONArray();

		JSONArray privilegeArray = Validator.fieldArray("Privileges",this.parameters,this,true);
		
		privilegeVO = new ValidatorObject(true);
		
		if(privilegeArray!=null){

			ListIterator<Object> iterator = privilegeArray.listIterator();
			while(iterator.hasNext()){
				int index = iterator.nextIndex();
				Object thisObject = iterator.next();
				if(thisObject instanceof JSONObject){

					try{
						RemovePrivilege priv = new RemovePrivilege((JSONObject)thisObject,this,index);
						removingPrivileges.add(priv);
					} catch (ValidatorError fe){
						privilegeVO.getOrMakeInvalid().put(""+index, fe.error);
					}

				} else {
					JSONObject expectedError = new JSONObject();
					expectedError.put("Expected", "Object");
					ValidatorError err = new ValidatorError(2,expectedError);
					this.getOrMakeInvalid().put(""+index, err.error);
				}
			}
			
		}

		try{
			Validator.finalErrorCheck(null, privilegeVO);
		} catch (ValidatorError fe){
			this.getOrMakeInvalid().put("Privileges", fe.error);
		}
		
		Validator.finalErrorCheck(this.parameters, this);
		
		MemcachedClient client = CouchbasePool.getInstance().getCache();

		Map<String, Object> getResults = client.getBulk(this.itemPathsForRemoveObjects.keySet());
		
		for(Entry<String, Pair<RemovePrivilege,String>> entry : this.itemPathsForRemoveObjects.entrySet()){
			Pair<RemovePrivilege,String> pair = entry.getValue();
			Object getFromResults = getResults.get(entry.getKey());
			if(getFromResults!=null){
				pair.left.receivePathResult(pair.right);
			}
		}
		
		for(RemovePrivilege rp : removingPrivileges){
			rp.checkExistance(privilegeVO);
		}
		
		try{
			Validator.finalErrorCheck(null, privilegeVO);
		} catch(ValidatorError fe){
			this.getOrMakeInvalid().put("Privileges", fe.error);
			Validator.finalErrorCheck(null, this);
		}
		
		new DeleteRequestHandler(this.user,null).processWithoutChecks(deletePaths);
		
		JSONObject toReturn = new JSONObject();

		toReturn.put("Privileges", privilegeArray);

		return toReturn;
	}
	
	public boolean getPathForRemovePrivilege(String path, RemovePrivilege rp){
		String memPath = CouchbasePool.toKVPathKey(path);
		return itemPathsForRemoveObjects.put(memPath, new Pair<RemovePrivilege,String>(rp,path))==null;
	}
	
	public void addPathToDelete(String path){
		deletePaths.put(path);
	}

	public void reportRemovePrivilegeHasError(Privilege priv, ValidatorError fe){
		privilegeVO.getOrMakeInvalid().put(""+priv.indexInArray, fe.error);
	}
}