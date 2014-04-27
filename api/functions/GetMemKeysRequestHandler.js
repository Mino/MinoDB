package requestHandlers;

import java.util.ArrayList;
import java.util.ListIterator;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.RawJSON;

import Models.User;

import minocloud.validator.ValidatorError;
import minocloud.validator.Validator;


import common.Pair;

import dataRetrieval.CouchbasePool;

public class GetMemKeysRequestHandler extends RequestHandler {

	JSONArray addressArray;
	ArrayList<Pair<String,RawJSON>> keys;// -> idVersions
	ArrayList<String> getFinalArray;

	public GetMemKeysRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);
	}

	@Override
	public JSONObject process() throws ValidatorError {

		keys = new ArrayList<Pair<String,RawJSON>>();
		getFinalArray = new ArrayList<String>();

		addressArray = Validator.fieldArray("Keys",this.parameters,this,true);
		if(addressArray!=null){
			ListIterator<Object> iterator = addressArray.listIterator();
			while(iterator.hasNext()){
				Object thisAddress = iterator.next();

				if(thisAddress instanceof String){

					if(((String) thisAddress).isEmpty()){
						iterator.set(new ValidatorError(11).error);
					} else {

						String string = ((String)thisAddress).replace(' ', (char)31);

						RawJSON thisJObj = new RawJSON(null);
						Pair<String,RawJSON> thisPair = new Pair<String,RawJSON>(string,thisJObj);
						iterator.set(thisJObj);
						keys.add(thisPair);
						this.getFinalArray.add(string);
					}
				} else {
					ValidatorError err = new ValidatorError(11);
					iterator.set(err.error);
				}
			}
		}
		Validator.finalErrorCheck(this.parameters, this);

		Map<String, Object> finalResult = CouchbasePool.getInstance().getCache().getBulk(this.getFinalArray);

		for (Pair<String,RawJSON> pair : this.keys){
			if(pair.left!=null){
				String mem = (String)finalResult.get(pair.left);
				if(mem==null){
					pair.right.cloneJSONObject(new ValidatorError(14).error);
				} else {
					
					try {
						new JSONObject(mem);
						pair.right.setString(mem.replace((char)30, '/').replace((char)31,' '));
					} catch (JSONException e) {
						pair.right.setString("\""+mem.replace((char)30,'/').replace((char)31,' ')+"\"");
					}
				}
			}
		}

		JSONObject result = new JSONObject();
		result.put("Keys", addressArray);
		return result;
	}

}
