package requestHandlers.privileges;

import java.util.ArrayList;
import java.util.ListIterator;

import org.json.JSONArray;
import org.json.JSONObject;

import Models.User;

import privileges.Privilege;
import requestHandlers.RequestHandler;
import requestHandlers.base.SaveRequestHandler;
import minocloud.validator.ValidatorError;
import minocloud.validator.Validator;
import minocloud.validator.ValidatorObject;

import dataRetrieval.UserExistanceChecker;

public class AddPrivilegesRequestHandler extends RequestHandler{

	public static int maximumAdd = 10;
	public UserExistanceChecker userExistanceChecker;
	public int totalSaving = 0;
	ValidatorObject privilegeVO = null;

	public AddPrivilegesRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);

	}
	
	@Override
	public JSONObject process() throws ValidatorError {

		userExistanceChecker = new UserExistanceChecker();
		
		ArrayList<Privilege> savingPrivileges = new ArrayList<Privilege>();

		JSONArray privilegeArray = Validator.fieldArray("Privileges",this.parameters,this,true);

		JSONArray savingFolderList = new JSONArray();
		JSONArray savingItemList = new JSONArray();
		
		privilegeVO = new ValidatorObject(true);
		
		if(privilegeArray!=null){

			ListIterator<Object> iterator = privilegeArray.listIterator();
			while(iterator.hasNext()){
				int index = iterator.nextIndex();
				Object thisObject = iterator.next();
				if(thisObject instanceof JSONObject){

					try{
						Privilege priv = new Privilege((JSONObject)thisObject,this,index,savingFolderList,savingItemList);
						savingPrivileges.add(priv);
						userExistanceChecker.addObject(priv, priv.grantedTo);
					} catch (ValidatorError fe){
						privilegeVO.getOrMakeInvalid().put(""+index, fe.error);
					}

				} else {
					ValidatorError err = new ValidatorError(2);
					privilegeVO.getOrMakeInvalid().put(""+index, err.error);
				}
			}
			
		}

		/* Runs reportUserExistance on each privilege, which in turn 
		 * runs reportPrivilegeHasError if there is an error. 
		 */
		userExistanceChecker.run();

		try{
			Validator.finalErrorCheck(null, privilegeVO);
		} catch (ValidatorError fe){
			this.getOrMakeInvalid().put("Privileges", fe.error);
		}
		
		Validator.finalErrorCheck(this.parameters, this);

		SaveRequestHandler folderSRH = new SaveRequestHandler(this.minoUser, null);
		folderSRH.processWithoutChecks(savingFolderList);
		
		SaveRequestHandler itemSRH = new SaveRequestHandler(this.minoUser, null);
		itemSRH.processWithoutChecks(savingItemList);
		
		JSONObject toReturn = new JSONObject();
		
		toReturn.put("Privileges", privilegeArray);

		return toReturn;
	}

	public void reportPrivilegeHasError(Privilege priv, ValidatorError fe){
		privilegeVO.getOrMakeInvalid().put(""+priv.indexInArray, fe.error);
	}

}