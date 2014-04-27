package dataRetrieval;

import java.util.ArrayList;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;

public class UserExistanceChecker implements Runnable{
	
	public TreeMap<String,ArrayList<UserExistanceListener>> usersToGet;
	
	public UserExistanceChecker(){
		usersToGet = new TreeMap<String,ArrayList<UserExistanceListener>>();
	}

	@Override
	public void run() {
		
		Map<String, Object> retrieved = CouchbasePool.getInstance().getCache().getBulk(usersToGet.keySet());
		Set<Entry<String,Object>> objSet = retrieved.entrySet();
		
		for(Entry<String,Object> ent : objSet){
			ArrayList<UserExistanceListener> waitingObjects = usersToGet.get(ent.getKey());
			String username = CouchbasePool.fromMembaseUsernameKey(ent.getKey());
			for(UserExistanceListener fo : waitingObjects){
				fo.reportUserExistance(username,true);
			}
			usersToGet.remove(ent.getKey());
		}
		
		Set<Entry<String,ArrayList<UserExistanceListener>>> remainingObjs = usersToGet.entrySet();
		
		for(Entry<String,ArrayList<UserExistanceListener>> ent : remainingObjs){
			String username = CouchbasePool.fromMembaseUsernameKey(ent.getKey());
			ArrayList<UserExistanceListener> objs = ent.getValue();
			for(UserExistanceListener fo : objs){
				fo.reportUserExistance(username,false);
			}
		}					
	}

	public void addObject(UserExistanceListener obj, String username) {
		ArrayList<UserExistanceListener> existing = usersToGet.get(CouchbasePool.toKVUsernameKey(username));
		if(existing==null){
			existing = new ArrayList<UserExistanceListener>();
			usersToGet.put(CouchbasePool.toKVUsernameKey(username), existing);
		}
		existing.add(obj);
	}
	
	
	
}
