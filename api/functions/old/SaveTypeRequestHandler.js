package requestHandlers.base;

import java.util.ArrayList;
import java.util.concurrent.Future;

import net.spy.memcached.CASResponse;
import net.spy.memcached.CASValue;
import net.spy.memcached.internal.GetFuture;
import net.spy.memcached.internal.OperationFuture;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import Models.User;

import com.couchbase.client.CouchbaseClient;

import main.APIRole;
import minocloud.serverdaemon.ServerDaemon;

import requestHandlers.RequestHandler;
import types.TypeComparer;
import types.TypeVersion;
import minocloud.validator.ValidatorError;
import minocloud.validator.Validator;
import minocloud.validator.ValidatorObject;

import common.Triple;

import dataRetrieval.CouchbasePool;
import fields.ValueField;

public class SaveTypeRequestHandler extends RequestHandler{

	ArrayList<Triple<String,JSONObject,Object>> typesNeeded;
	JSONArray typeIssues;
	JSONArray issues;
	JSONObject typeObject;
	TypeVersion tv;
	Integer version = null;
	Boolean strictVersioning = null;
	Boolean isRevising = null;

	public SaveTypeRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);
	}

	@Override
	public JSONObject process() throws ValidatorError {

		//Used to specify whether or not the provided version number must be the next available one
		strictVersioning = Validator.fieldBoolean("Strict Versioning",this.parameters,this,false);
		if(strictVersioning==null){
			strictVersioning = true;
		}

		try{

			typeObject = Validator.fieldObject("Type",this.parameters,this,true);
			if(typeObject!=null){
				try{
					String fullOrPartialName = null;

					fullOrPartialName = typeObject.getString("Full Name");

					tv = new TypeVersion(fullOrPartialName,this.user.username);//Username passes on who is saving the type
					tv.setStrictVersioning(strictVersioning);
					tv.initialize(typeObject);

				} catch(ValidatorError fe){
					this.getOrMakeInvalid().put("Type", fe.error);
				}
			}

			isRevising = Validator.fieldBoolean("Revising",this.parameters,this,false);
			if(isRevising==null){
				isRevising = false;
			} else if(isRevising==true){
				if(tv.fullVersionName==null){
					this.getOrMakeInvalid().put("Revising",new ValidatorError(184).error);
				}
			}

			Validator.finalErrorCheck(this.parameters, this);

		} catch (JSONException je){
			ServerDaemon.error(je);
			throw new ValidatorError(5);
		}

		CouchbaseClient client = CouchbasePool.getInstance().getCache();

		long versionNum = 1;

		if(isRevising){
			//If revising, the full name must already be known

			try{

				String typeFullNameKey = CouchbasePool.toKVDetailedTypeVersionKey(tv.fullVersionName);

				GetFuture<Object> typeGetFuture = client.asyncGet(typeFullNameKey);

				if(typeGetFuture.get()==null){
					//The type doesn't exist
					this.getOrMakeInvalid().put("Revising",new ValidatorError(184).error);
				} else {
					//The type exists. Try to get a lock on it


					CASValue<Object> fullNameLock = null;

					int attempts = 0;
					boolean acquiredLock = false;
					while(attempts<10 && !acquiredLock){

						//Lock the partial name (Username.TypeName) during the save process
						OperationFuture<CASValue<Object>> fullNameLockFuture = client.asyncGetAndLock(typeFullNameKey, 5);

						fullNameLock = fullNameLockFuture.get();

						Object fullNameValue = fullNameLock.getValue();
						if(fullNameValue!=null){
							acquiredLock = true;
						}
					}

					if(!acquiredLock){
						ServerDaemon.error(new ValidatorError(5));
						throw new ValidatorError(5);
					}

					String baseTypeString = (String)fullNameLock.getValue();

					JSONObject baseTypeJSON = new JSONObject(baseTypeString);
					
					//Passing in the username creates the JSON objects for each field. Must use partialName to prevent version errors.
					TypeVersion baseType = new TypeVersion(tv.partialName, (String)null);
					baseType.initialize(baseTypeJSON);

					try{
						TypeComparer.processBaseAndRevision(baseType, tv);
					} catch (ValidatorError ve){
						System.out.println("Error: 1");
						client.asyncUnlock(typeFullNameKey,fullNameLock.getCas());
						ValidatorObject typeValidator = new ValidatorObject();
						typeValidator.getOrMakeInvalid().put("Fields",ve.error);
						try{
							System.out.println("Error: 2");
							Validator.finalErrorCheck(null, typeValidator);
						} catch (ValidatorError fieldError){
							System.out.println("Error: 3");
							this.getOrMakeInvalid().put("Type",fieldError.error);
							//Will throw ValidatorError
							Validator.finalErrorCheck(null, this);
						}

					}

					if(baseType.revision==null){
						tv.setRevision(1);
					} else {
						tv.setRevision(baseType.revision+1);
					}

					String memSaveString = tv.savingJSON.toString();
					String memDetailedSaveString = tv.savingDetailedJSON.toString();

					System.out.println("memSaveString: "+memSaveString);

					Future<Boolean> didSetVersionFuture = client.set(CouchbasePool.toKVFunctionalTypeVersionKey(tv.fullVersionName), 0, memSaveString);
					OperationFuture<CASResponse> saveAndUnlockFuture = client.asyncCAS(typeFullNameKey, fullNameLock.getCas(), memDetailedSaveString);

					System.out.println("didSetVersionFuture.get(): "+didSetVersionFuture.get());
					CASResponse saveAndUnlock = saveAndUnlockFuture.get();

				}
			} catch (ValidatorError ve){
				System.out.println("Error: 4");
				//Pass the ValidatorError up
				throw ve;
			} catch (Exception ex){
				System.out.println("Error: 5");
				ServerDaemon.error(ex);
				throw new ValidatorError(5);
			}


		} else {

			try{

				String partialNameKey = CouchbasePool.toKVTypeVersionNumKey(tv.partialName);

				Future<Boolean> didAddVersionOneFuture = client.add(partialNameKey, 0, "1");
				Boolean didAddVersionOne = didAddVersionOneFuture.get();

				CASValue<Object> partialNameLock = null;

				int attempts = 0;
				boolean acquiredLock = false;
				while(attempts<10 && !acquiredLock){

					//Lock the partial name (Username.TypeName) during the save process
					OperationFuture<CASValue<Object>> partialNameLockFuture = client.asyncGetAndLock(partialNameKey, 5);

					partialNameLock = partialNameLockFuture.get();

					Object partialNameValue = partialNameLock.getValue();
					if(partialNameValue!=null){
						acquiredLock = true;
					}
				}

				if(!acquiredLock){
					ServerDaemon.error(new ValidatorError(5));
					throw new ValidatorError(5);
				}

				if(!didAddVersionOne){
					versionNum = (Long)partialNameLock.getValue();
					versionNum++;
				}


				tv.setVersion(versionNum);

				String memSaveString = tv.savingJSON.toString();
				String memDetailedSaveString = tv.savingDetailedJSON.toString();

				Future<Boolean> didAddVersionFuture = client.add(CouchbasePool.toKVFunctionalTypeVersionKey(tv.fullVersionName), 0, memSaveString);
				Future<Boolean> didAddDetailedVersionFuture = client.add(CouchbasePool.toKVDetailedTypeVersionKey(tv.fullVersionName), 0, memDetailedSaveString);

				didAddVersionFuture.get();
				didAddDetailedVersionFuture.get();

				//ELASTICSEARCH MAPPING CREATION IS DONE ON DEMAND BY SAVE FUNCTION

				JSONArray fieldArray = new JSONArray();
				for(ValueField field : tv.fieldList){
					fieldArray.put(field.name);
				}

				JSONArray savingItemList = new JSONArray();
				JSONObject toSaveReceived = new JSONObject();
				toSaveReceived.put("Name", tv.fullVersionName);
				toSaveReceived.put("Folder",false);
				toSaveReceived.put("Path", "/"+this.user.username+"/Type Privileges/Personal/");
				JSONObject fpv1Obj = new JSONObject();
				fpv1Obj.put("Type Version", tv.fullVersionName);
				fpv1Obj.put("Display Name", tv.name);
				fpv1Obj.put("Granted By", this.user.username);
				fpv1Obj.put("Granted To", this.user.username);
				if(tv.description!=null){
					fpv1Obj.put("Description", tv.description);
				}
				fpv1Obj.put("Fields",fieldArray);
				toSaveReceived.put("Mino.TypePrivilege.1", fpv1Obj);

				savingItemList.put(toSaveReceived);

				SaveRequestHandler itemSRH = new SaveRequestHandler(this.minoUser, null);
				itemSRH.processWithoutChecks(savingItemList);

				OperationFuture<CASResponse> saveAndUnlockFuture = client.asyncCAS(partialNameKey, partialNameLock.getCas(), ""+versionNum);

				CASResponse saveAndUnlock = saveAndUnlockFuture.get();

			} catch (Exception ex){
				ServerDaemon.error(ex);
				throw new ValidatorError(5);
			}

		}

		Validator.finalErrorCheck(null, this);

		APIRole.typeSaved();

		JSONObject toReturn = new JSONObject();
		toReturn.put("Name",tv.fullVersionName);
		toReturn.put("Type",tv.savingDetailedJSON);

		if(isRevising){
			toReturn.put("Revision",tv.revision);
		}

		return toReturn;
	}

}
