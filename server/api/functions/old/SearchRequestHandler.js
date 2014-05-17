public class SearchRequestHandler extends RequestHandler implements PrivilegeArrayListener, ConditionListener{

	String path;
	ObjectPrivilegeRetriever objectPrivilegeRetriever;
	public HashMap<String, JSONObject> typeVersionContents;
	public TypeRetriever typeRetriever;
	boolean accessGranted = false;
	BoolFilterBuilder searchFilterBuilder = null;
	Condition baseCondition;

	public SearchRequestHandler(User user, JSONObject parameters) throws ValidatorError {
		super(user, parameters);
	}

	@Override
	public JSONObject process() throws ValidatorError {

		this.objectPrivilegeRetriever = new ObjectPrivilegeRetriever(this.user, this, false);
		this.typeVersionContents = new HashMap<String,JSONObject>();
		this.typeRetriever = new TypeRetriever(this.user);
		this.clusterTypeSaver = new ClusterTypeSaver(this.typeRetriever, this.client);

		//The user whose search cluster is being searched (if App folder then use the App's user)
		String clusterUser = null;

		searchFilterBuilder = FilterBuilders.boolFilter();

		JSONObject returning = new JSONObject();

		Boolean includeSubfoldersObj = Validator.fieldBoolean("Include Subfolders", parameters, this, false);
		boolean includeSubfolders = true;//Include subfolders by default
		if(includeSubfoldersObj!=null){
			includeSubfolders = includeSubfoldersObj.booleanValue();
		}

		Boolean returnIDsObj = Validator.fieldBoolean("Return IDs", parameters, this, false);
		boolean returnIDs = false;//Return full objects by default
		if(returnIDsObj!=null){
			returnIDs = returnIDsObj.booleanValue();
		}

		Integer startingIndex = Validator.fieldInteger("Starting Index", parameters, this, false);
		if(startingIndex!=null){
			if(startingIndex<0){
				this.getOrMakeInvalid().put("StartingIndex",new ValidatorError(100).error);
			}
		} else {
			startingIndex = 0;
		}

		Integer resultSize = Validator.fieldInteger("Result Size", parameters, this, false);
		if(resultSize!=null){
			if(resultSize<1 || resultSize>1000){
				this.getOrMakeInvalid().put("Result Size",new ValidatorError(101).error);
			}
		} else {
			resultSize = 100;
		}


		Path folderPath = null;
		String folderPathString = Validator.fieldString("Path", parameters, this, true);
		if(folderPathString!=null){
			try{
				folderPath = new Path(folderPathString,true,true);
				if(!folderPath.isFolder()){
					throw new ValidatorError(8);
				}

				if(folderPath.isAppPath) {
					clusterUser = this.user.username;
				} else {
					objectPrivilegeRetriever.addPathForObject(folderPath,null);
					clusterUser = folderPath.objectNames[0];
				}

			} catch (ValidatorError fe){
				this.getOrMakeInvalid().put("Path", fe.error);
			}
		}

		Boolean folderQuery = Validator.fieldBoolean("Folder", parameters, this, false);
		if(folderQuery!=null){
			searchFilterBuilder.must(FilterBuilders.queryFilter(QueryBuilders.termQuery("Folder", folderQuery)));
		}


		ArrayList<SortBuilder> sorts = new ArrayList<SortBuilder>();

		JSONArray sort = Validator.fieldArray("Sort", parameters, this, false);
		if(sort!=null){
			ListIterator<Object> iterator =  sort.listIterator();
			while(iterator.hasNext()){
				Object thisObj = iterator.next();
				if(thisObj instanceof JSONObject){
					JSONObject sortCondition = (JSONObject)thisObj;
					ValidatorObject sortConditionValidator = new ValidatorObject();
					String sortField = Validator.fieldString("Field", sortCondition, sortConditionValidator, true);
					if(sortField!=null){
						if(Common.isValidTypeFieldName(sortField)){
							String[] split = Common.splitTypeFieldName(sortField);
							String typeName = split[0]+"."+split[1]+"."+split[2];
							typeRetriever.requestTypeVersionNameWithListener(typeName, null);
						}
					}
				}
			}
		}

		SortOrder sortOrderValue = SortOrder.ASC;
		String sortbyOrderString = Validator.fieldString("Sort Order", parameters, this, false);
		if(sortbyOrderString!=null){
			if(sortbyOrderString.equals("Ascending")){
				//sortOrder defaults to ASC
			} else if(sortbyOrderString.equals("Descending")){
				sortOrderValue = SortOrder.DESC;
			} else {
				sortbyOrderString = null;
				this.getOrMakeInvalid().put("Sort Order",new ValidatorError(149));
			}
		}

		SortBuilder sortBuilder = null;

		String sortedByField = Validator.fieldString("Sort By", parameters, this, false);
		if(sortedByField!=null){

			if(sortedByField.equals("Name")){
				sortBuilder = SortBuilders.fieldSort("Name.untouched").order(sortOrderValue);
			} else if(sortedByField.equals("ID") || sortedByField.equals("Folder") || sortedByField.equals("Full Path") ||  sortedByField.equals("Path") || sortedByField.equals("Created") || sortedByField.equals("Last Updated")){
				sortBuilder = SortBuilders.fieldSort(sortedByField).order(sortOrderValue);
			} else if(Common.isValidTypeFieldName(sortedByField)) {
				sortBuilder = SortBuilders.fieldSort(sortedByField).order(sortOrderValue);
				String[] split = sortedByField.split("\\.");
				Future<Object> personalFuture = null;
				Future<Object> publicFuture = null;
				String typeName = split[0]+"."+split[1]+"."+split[2];
				Future<Object> typeVersionFuture = client.asyncGet(CouchbasePool.toKVFunctionalTypeVersionKey(typeName));

				boolean successful = true;
				if(!split[0].equals(this.user.username)){

					personalFuture = client.asyncGet(CouchbasePool.toKVPathKey("/"+this.user.username+"/Type Privileges/Received/"+split[0]+"/"+typeName));
					publicFuture = client.asyncGet(CouchbasePool.toKVPathKey("/Public/Type Privileges/Received/"+split[0]+"/"+typeName));

					try{
						String personalPrivilege = (String)personalFuture.get();
						String publicPrivilege = (String)publicFuture.get();

						if(personalPrivilege==null && publicPrivilege==null){
							successful = false;
						}
					} catch (ExecutionException ee){
						successful = false;
					} catch (InterruptedException e) {
						successful = false;
					}
				}

				JSONObject jsonType = null;

				if(successful){
					successful = false;
					try {
						String typeVersion = (String)typeVersionFuture.get();
						if(typeVersion==null){
							successful = false;
						} else {
							jsonType = new JSONObject(typeVersion);						
							successful = true;
							if(clusterUser!=null){
								clusterTypeSaver.addUserFolderAndType(clusterUser, typeName);
							}
						}
					} catch (Exception e) {
						ServerDaemon.error(new Exception());
						throw new ValidatorError(5);
					}
				}

				if(!(successful)){
					this.getOrMakeInvalid().put("Sort By", new ValidatorError(15).error);
				} else {
					successful = false;
					try {
						TypeVersion tv = new TypeVersion(typeName);
						tv.initialize(jsonType);
						try{
							tv.hasSortableFieldNamed(split[3]);
						} catch (ValidatorError ve){
							this.getOrMakeInvalid().put("Sort By",ve.error);
						}
					} catch (JSONException e) {
						ServerDaemon.error(e);
					}
				}
			} else {
				this.getOrMakeInvalid().put("Sort By", new ValidatorError(86).error);
			}
		} else {//sortedByField==null
			if(sortbyOrderString!=null){
				this.getOrMakeInvalid().put("Sort Order", new ValidatorError(170).error);
			}
		}

		baseCondition = new Condition(this.parameters, typeRetriever, this, -1, this);//-1 indicates base

		//Add the fields recognized by the condition to those recognized by the base search handler
		this.recognized.addAll(baseCondition.recognized);
		
		boolean didFindFolder = false;

		if(folderPath==null){
			accessGranted = true;
			didFindFolder = true;
		} else {

			if(folderPath.isAppPath){
				didFindFolder = true;
				accessGranted = true;
			} else {

				String folderIDAndVersion = (String)client.get(CouchbasePool.toKVPathKey(folderPath.toString()));

				if(folderIDAndVersion!=null){
					String folder = (String)client.get(CouchbasePool.toKVIDVersionKey(folderIDAndVersion));
					if(folder!=null){
						didFindFolder = true;
					}
				}
			}
		}

		if(!didFindFolder){
			this.getOrMakeInvalid().put("Path", new ValidatorError(14).error);
		}

		if(!(accessGranted)){
			this.objectPrivilegeRetriever.run();
		}

		//If is still false (objectPrivilegeRetriever might have granted it)
		if(!(accessGranted)){
			this.getOrMakeInvalid().put("Path", new ValidatorError(14).error);
		}

		/* This will complete the processing of  all of the conditions
		 * as they are waiting for types.
		 */
		this.typeRetriever.run();

		/* Because Sorts needed to check type existence they must be checked after
		 * typeRetriever has been run.
		 */
		if(sort!=null){
			ValidatorObject sortValidator = new ValidatorObject();
			ListIterator<Object> iterator =  sort.listIterator();
			while(iterator.hasNext()){
				Object thisObj = iterator.next();
				if(!(thisObj instanceof JSONObject)){
					JSONObject expectedError = new JSONObject();
					expectedError.put("Expected", "Object");
					sortValidator.getOrMakeInvalid().put(""+iterator.previousIndex(), new ValidatorError(2,expectedError).error);
				} else {
					JSONObject sortCondition = (JSONObject)thisObj;
					ValidatorObject sortConditionValidator = new ValidatorObject();

					SortOrder sortOrder = null;
					String sortOrderString = Validator.fieldString("Order", sortCondition, sortConditionValidator, true);
					if(sortOrderString!=null){
						if(sortOrderString.equals("Ascending")){
							sortOrder = SortOrder.ASC;
						} else if(sortOrderString.equals("Descending")){
							sortOrder = SortOrder.DESC;
						} else {
							sortConditionValidator.getOrMakeInvalid().put("Order",new ValidatorError(149));
						}
					}
					String sortField = Validator.fieldString("Field", sortCondition, sortConditionValidator, true);
					if(sortField!=null){
						if(sortField.equals("Name")){
							if(sortOrder!=null){
								sorts.add(SortBuilders.fieldSort("Name.untouched").order(sortOrder));
							}
						} else if(sortField.equals("ID") || sortField.equals("Folder") || sortField.equals("Full Path") ||  sortField.equals("Path") || sortField.equals("Created") || sortField.equals("Last Updated")){
							if(sortOrder!=null){
								sorts.add(SortBuilders.fieldSort(sortField).order(sortOrder));
							}
						} else if(Common.isValidTypeFieldName(sortField)){
							if(sortOrder!=null){
								String[] split = Common.splitTypeFieldName(sortField);
								String typeName = split[0]+"."+split[1]+"."+split[2];
								String fieldName = split[3];
								TypeVersion tv = typeRetriever.types.get(typeName);
								if(tv==null || !tv.isInitialized){
									sortConditionValidator.getOrMakeInvalid().put("Field", new ValidatorError(86).error);
								} else {
									if(clusterUser!=null){
										clusterTypeSaver.addUserFolderAndType(clusterUser, typeName);
									}

									try{
										tv.hasSortableFieldNamed(fieldName);

										//Only reach if exception is not thrown by hasSortableFieldNamed
										sorts.add(SortBuilders.fieldSort(sortField).order(sortOrder));
									} catch (ValidatorError ve){
										sortConditionValidator.getOrMakeInvalid().put("Field", ve.error);
									}
								}
							}
						} else {
							sortConditionValidator.getOrMakeInvalid().put("Field", new ValidatorError(86).error);
						}
					}
					try{
						Validator.finalErrorCheck(sortCondition, sortConditionValidator);
					} catch (ValidatorError fe){
						sortValidator.getOrMakeInvalid().put(""+iterator.previousIndex(), fe.error);
					}
				}
			}
			try{
				Validator.finalErrorCheck(null, sortValidator);
			} catch (ValidatorError fe){
				this.getOrMakeInvalid().put("Sort", fe.error);
			}
		}

		sorts.add(SortBuilders.scoreSort());

		/* Add the base condition to the search. This will add all
		 * sub-conditions.
		 */

		for(Entry<String, TypeVersion> entry : this.typeRetriever.types.entrySet()){
			String typeName = entry.getKey();
			TypeVersion tv = entry.getValue();
			if(tv.isInitialized){
				if(clusterUser!=null){
					clusterTypeSaver.addUserFolderAndType(clusterUser, typeName);
				}
			} else {
				//Will create an error elsewhere
			}
		}

		//Can throw errors
		if(didFindFolder){
			//Don't run this if the folder doesn't exist
			clusterTypeSaver.run();
		}

		baseCondition.addToQuery(searchFilterBuilder, false);

		Validator.finalErrorCheck(this.parameters, this);

		this.addUnitCost(SearchRequestHandler.baseCost);
		this.addUnitCost(baseCondition.cost);

		Client elasticSearchClient = ElasticSearchNode.getInstance().getClient();

		if(folderPath!=null){
			String folderAbsoluteString = folderPath.toString();
			if(folderPath.isAppPath){
				folderAbsoluteString = "/"+user.username+folderAbsoluteString.substring(1);
				if(includeSubfolders){
					searchFilterBuilder.must(FilterBuilders.prefixFilter("App Path", folderAbsoluteString));
				} else {
					searchFilterBuilder.must(FilterBuilders.termFilter("App Path", folderAbsoluteString));
				}
			} else {
				if(includeSubfolders){
					searchFilterBuilder.must(FilterBuilders.prefixFilter("Path", folderAbsoluteString));
				} else {
					searchFilterBuilder.must(FilterBuilders.termFilter("Path", folderAbsoluteString));
				}
			}
		}

		String searchCluster = CouchbasePool.getSearchClusterForUser(clusterUser);

		if(searchCluster==null){
			ServerDaemon.error(new Exception());
			throw new ValidatorError(5);
		}

		SearchRequestBuilder srb = elasticSearchClient.prepareSearch(searchCluster);

		if(folderPath.isAppPath){
			//App paths use the current username to expand their relative path (e.g. ~/Posts/ becomes /MinoSocial/Posts/)
			srb.setRouting("App."+user.username);
		} else {
			srb.setRouting("User."+folderPath.objectNames[0]);
		}
		searchFilterBuilder.must(FilterBuilders.termFilter("App Routing", folderPath.isAppPath));
		
		srb
		.setFilter(searchFilterBuilder)
		.setSearchType(SearchType.QUERY_AND_FETCH)
		.setFrom(startingIndex)
		.setSize(resultSize);

		if(sortBuilder!=null){
			srb.addSort(sortBuilder);
		}

		for(SortBuilder sb : sorts){
			srb.addSort(sb);
		}

		ListenableActionFuture<SearchResponse> future = srb.execute();

		SearchResponse response = future.actionGet();

		SearchHits sh = response.getHits();

		Iterator<SearchHit> iter = sh.iterator();

		JSONArray resultArray = new JSONArray();

		while(iter.hasNext()){
			SearchHit hit = iter.next();

			try {
				JSONObject toJSON = new JSONObject(hit.sourceAsString());
				if(returnIDs){
					resultArray.put(toJSON.get("ID"));
				} else {
					toJSON.remove("Types");
					toJSON.remove("App Routing");
					resultArray.put(new RawJSON(toJSON.toString()));
				}
			} catch (JSONException e) {
				ServerDaemon.error(e);
				resultArray.put(new RawJSON(new ValidatorError(5).error.toString()));
			}
		}

		try {
			int returnedAmount = sh.getHits().length;
			this.addUnitCost((returnedAmount/100)*SearchRequestHandler.costPerHundredResults);

			returning.put("Starting Index", startingIndex);
			returning.put("Returned Amount", returnedAmount);
			returning.put("Total",sh.getTotalHits());

			if(returnIDs){
				returning.put("IDs", resultArray);
			} else {
				returning.put("Objects", resultArray);
			}
		} catch (JSONException e) {
			ServerDaemon.error(e);
		}

		APIRole.searchPerformed();

		return returning;
	}

	@Override
	public void subConditionHasError(int index, ValidatorError fe) {
		JSONObject invalid = fe.error.getJSONObject("Invalid");
		if(invalid!=null){
			this.getOrMakeInvalid().put(invalid);
		}
		JSONObject missing = fe.error.getJSONObject("Missing");
		if(missing!=null){
			this.getOrMakeMissing().put(missing);
		}
		JSONObject unrecognized = fe.error.getJSONObject("Unrecognized");
		if(unrecognized!=null){
			this.getOrMakeUnrecognized().put(unrecognized);
		}
	}

	@Override
	public void privilegeArrayAvailable(ArrayList<Object> array) {
		accessGranted = true;
	}

	@Override
	public void endOfPrivileges() {

	}

	@Override
	public void subConditionCompleted(int index) {

	}

}
