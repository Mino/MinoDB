package requestHandlers.account;

import org.json.JSONObject;

import Models.User;

import requestHandlers.RequestHandler;

import usage.UsageCompiler;
import minocloud.validator.ValidatorError;
import minocloud.validator.Validator;

import common.Common;


public class CompileUsageRequestHandler extends RequestHandler {

	public CompileUsageRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);
	}

	@Override
	public JSONObject process() throws ValidatorError {

		String compileUsername = Validator.fieldString("Username", parameters, this, true);
		if(compileUsername!=null){
			if(Common.isValidUsername(compileUsername)){
				try{
					new UsageCompiler(compileUsername).compileUsage();
				} catch (ValidatorError fe){
					this.getOrMakeInvalid().put("Username", fe);
				}
			} else {
				this.getOrMakeInvalid().put("Username", new ValidatorError(53).error);
			}
		}
		
		Validator.finalErrorCheck(parameters, this);
		
		JSONObject toReturn = new JSONObject();
		toReturn.put("Compiled",true);
		
		return toReturn;
	}

}
