public class APIServlet extends HttpServlet {

    public static JSONObject addTimeToResponse(JSONObject response) {
        response.put("Current Time", Common.getDateTimeString(Common.SECONDSDATEFORMAT));
        return response;
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        PrintWriter writer = null;
        response.setContentType("application/json;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);
        try {
            writer = response.getWriter();
            JSONObject toReturn = new JSONObject();
            APIServlet.addTimeToResponse(toReturn);
            writer.println(toReturn.toString());
        } catch (IOException e) {
            ServerDaemon.error(e);
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) {

        PrintWriter writer = null;
        response.setContentType("application/json;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);

        // Get current time (used for measuring the execution time of a request)
        long start = System.currentTimeMillis();

        APIRole.apiCall();

        try {

            //Get the writer for the response
            writer = response.getWriter(); //Can throw IOException

            //Acquire a CouchbaseClient for key-value storage interactions
            CouchbaseClient client = CouchbasePool.getInstance().getCache();

            //Extract the username and request from the POST parameters
            String usernameString = request.getParameter("username");
            String apiRequest = request.getParameter("request");
            String sessionid = request.getParameter("sessionid");

            String encryptionKey = null;
            String decryptedRequest = null;
            String iv = null;

            //Check that the parameters are present and are not empty
            if (usernameString == null || apiRequest == null || usernameString.length() == 0 || apiRequest.length() == 0) {
                writer.println(APIServlet.addTimeToResponse(new ValidatorError(9).error));
                return;
            }

            /* It can be assumed that this isn't just the load balancer 
             * performing checks. If this server started the cluster, it
             * should attempt the postSetup procedure.
             */

            if (Main.didInitialSetup && !Main.didPostSetup) {
                Main.didPostSetup = true;
                Main.postServerStartSetup();
            }


            //Get the current date 
            User user;
            try {
                user = new User(usernameString, client);
            } catch (ValidatorError ve) {
                writer.println(APIServlet.addTimeToResponse(ve.error));
                return;
            }


            try {
                user.getData();
            } catch (ValidatorError ve) {
                //userFromKV was null (User record was not found for this username)
                writer.println(APIServlet.addTimeToResponse(new ValidatorError(10).error));
                return;
            }


            //Session-based authentication is being used. Key must be checked
            if (sessionid != null) {

                //Check that the sessionid is a valid possible id.
                try {
                    if (Long.parseLong(sessionid) < 0) {
                        throw new NumberFormatException();
                    }
                } catch (NumberFormatException nfe) {
                    writer.println(APIServlet.addTimeToResponse(new ValidatorError(124).error));
                    return;
                }

                try {
                    //Request the session from the Sessions Directory in the Mino user's root directory
                    Future < Object > sessionIDVersionFromKVFuture = client.asyncGet(CouchbasePool.toKVPathKey("/Mino/Sessions Directory/" + user.username + "/Session " + sessionid));

                    //Get the reference to the session object
                    String sessionIDVersionFromKV = (String) sessionIDVersionFromKVFuture.get();

                    //If the session wasn't found then throw an error back to the client
                    if (sessionIDVersionFromKV == null) {
                        writer.println(APIServlet.addTimeToResponse(new ValidatorError(124).error));
                        return;
                    }

                    //Request the session object using the reference from above
                    Future < Object > sessionFromKVFuture = client.asyncGet(CouchbasePool.toKVIDVersionKey(sessionIDVersionFromKV));

                    //Prepare a reference to a JSONObject that will hold the session object
                    JSONObject sessionJSON = null;

                    //Get the session object
                    String sessionFromKV = (String) sessionFromKVFuture.get();

                    //If the session object was present
                    if (sessionFromKV != null) {

                        //Fill in the JSON reference created above with the retrieved session
                        sessionJSON = new JSONObject(sessionFromKV);

                        //Get the session type from the session object
                        JSONObject minoSession = sessionJSON.getJSONObject("Mino.Session.1");

                        //Get the key from the session type
                        String sessionKeyFromDB = minoSession.getString("Key");

                        //Set the password for the encryption and decryption as the key from the session
                        encryptionKey = sessionKeyFromDB;

                        //If the session isn't set to active then thrown an error back to the client
                        if (!minoSession.getBoolean("Active")) {
                            writer.println(APIServlet.addTimeToResponse(new ValidatorError(124).error));
                            return;
                        }

                        //Attempt to decrypt the request sent by the user with the password from the session
                        try {
                            String[] decrypted = Crypt.decrypt(apiRequest, encryptionKey);
                            decryptedRequest = decrypted[0];
                            iv = decrypted[1];
                        } catch (Exception e) {
                            writer.println(APIServlet.addTimeToResponse(new ValidatorError(124).error));
                            return;
                        }

                    } else {
                        //sessionFromKV was null (User record was not found for this username)

                        writer.println(APIServlet.addTimeToResponse(new ValidatorError(124).error));
                        return;
                    }

                } catch (Exception e) {
                    ServerDaemon.error(new Exception());
                    writer.println(APIServlet.addTimeToResponse(new ValidatorError(5).error));
                    ServerDaemon.error(e);
                    return;
                }
            } else {
                String[] decryptedOutput = user.decrypt(apiRequest);
                decryptedRequest = decryptedOutput[0];
                iv = decryptedOutput[1];
                encryptionKey = decryptedOutput[2];
            }


            boolean useBilling = false;
            if (!user.isSystemUser()) {
                if (user.useBilling()) {
                    useBilling = true;
                } else { //Do some checks on prepaid usage

                    if (!user.hasUnits()) {
                        writer.println(APIServlet.addTimeToResponse(new ValidatorError(159).error));
                        return;
                    }

                }
            }


            //Convert the decrypted request into a JSONObject
            JSONObject requestObject = null;
            try {
                requestObject = new JSONObject(decryptedRequest);
            } catch (JSONException e) {
                //There was an issue in converting the request into a JSONObject (most likely invalid JSON was sent)
                writer.println(APIServlet.addTimeToResponse(new ValidatorError(13).error));
                return;
            }

            String
            function = null;
            JSONObject parameters = null;
            Double time = null;

            try {
                function = requestObject.getString("Function");
                parameters = requestObject.getJSONObject("Parameters");
                time = requestObject.getDouble("Time");

                if (function == null || parameters == null || time == null) {
                    //One of the above fields is missing (all are required)
                    writer.println(Crypt.encrypt((APIServlet.addTimeToResponse(new ValidatorError(16).error)).toString(), encryptionKey, iv));
                    return;
                }
            } catch (JSONException e) {
                //Either function isn't a string or parameters aren't a jsonobject or time isn't a double
                writer.println(Crypt.encrypt((APIServlet.addTimeToResponse(new ValidatorError(16).error)).toString(), encryptionKey, iv));
                return;
            }

            double requestTime = time.doubleValue();
            double currentTime = System.currentTimeMillis() / 1000;

            if (requestTime > (currentTime + Common.secondsInOneDay) || requestTime < (currentTime - Common.secondsInOneDay)) {
                writer.println(Crypt.encrypt((APIServlet.addTimeToResponse(new ValidatorError(156).error)).toString(), encryptionKey, iv));
                return;
            }

            String hash = time.toString() + ":" + apiRequest.hashCode() + ":" + user.username;

            OperationFuture < Boolean > hashFuture = client.add(CouchbasePool.toKVTransmissionHashKey(hash), 60 * 60 * 48, hash);
            boolean successfulHashInsertion = hashFuture.get();

            if (!successfulHashInsertion) {
                writer.println(Crypt.encrypt((APIServlet.addTimeToResponse(new ValidatorError(155).error)).toString(), encryptionKey, iv));
                return;
            }

            JSONObject requestResponse = null;

            //Instantiate the appropriate handler for the function name requested
            try {
                RequestHandler handler;
                if (function.equals("Get")) {
                    handler = new GetRequestHandler(user, parameters);
                } else if (function.equals("Third Party")) {
                    handler = new ThirdPartyRequestHandler(user, parameters);
                } else if (function.equals("Search")) {
                    handler = new SearchRequestHandler(user, parameters);
                } else if (function.equals("Save")) {
                    handler = new SaveRequestHandler(user, parameters);
                } else if (function.equals("Save Type")) {
                    handler = new SaveTypeRequestHandler(user, parameters);
                } else if (function.equals("Add Privileges")) {
                    handler = new AddPrivilegesRequestHandler(user, parameters);
                } else if (function.equals("Remove Privileges")) {
                    handler = new RemovePrivilegesRequestHandler(user, parameters);
                } else if (function.equals("Add Type Privileges")) {
                    handler = new AddTypePrivilegesRequestHandler(user, parameters);
                } else if (function.equals("Counter")) {
                    handler = new CounterRequestHandler(user, parameters);
                } else if (function.equals("Delete")) {
                    handler = new DeleteRequestHandler(user, parameters);
                } else if (function.equals("Activate App")) {
                    handler = new ActivateAppRequestHandler(user, parameters);
                } else if (function.equals("App Invite")) {
                    handler = new AppInviteRequestHandler(user, parameters);
                } else if (function.equals("Get Version List")) {
                    handler = new GetVersionListRequestHandler(user, parameters);
                } else if (function.equals("Delete Versions")) {
                    handler = new DeleteVersionsRequestHandler(user, parameters);
                } else if (function.equals("Notify")) {
                    handler = new NotifyRequestHandler(user, parameters);
                } else if (function.equals("Check Token")) {
                    handler = new CheckTokenRequestHandler(user, parameters);
                } else if (function.equals("Set Token") && user.username.equals("Mino")) {
                    handler = new SetTokenRequestHandler(user, parameters);
                } else if (function.equals("New User") && user.username.equals("Mino")) {
                    handler = new NewUserRequestHandler(user, parameters);
                } else if (function.equals("Change Password") && user.username.equals("Mino")) {
                    handler = new ChangePasswordRequestHandler(user, parameters);
                } else if (function.equals("Check Password") && user.username.equals("Mino")) {
                    handler = new CheckPasswordRequestHandler(user, parameters);
                } else if (function.equals("Create New API Key") && user.username.equals("Mino")) {
                    handler = new APIKeyRequestHandler(user, parameters);
                } else if (function.equals("Get Mem Keys") && user.username.equals("Mino")) {
                    handler = new GetMemKeysRequestHandler(user, parameters);
                } else if (function.equals("Stats") && user.username.equals("Mino")) {
                    handler = new GetStatsRequestHandler(user, parameters);
                } else if (function.equals("Start Password Reset") && user.username.equals("Mino")) {
                    handler = new StartPasswordResetRequestHandler(user, parameters);
                } else if (function.equals("Notification Initialisation") && user.username.equals("Notifications")) {
                    handler = new NotificationInitialisationRequestHandler(user, parameters);
                } else if (function.equals("Deliver Notifications") && user.username.equals("Notifications")) {
                    handler = new DeliverNotificationsRequestHandler(user, parameters);
                } else if (function.equals("Compile Usage") && user.username.equals("Mino")) {
                    handler = new CompileUsageRequestHandler(user, parameters);
                } else if (function.equals("Sign Out") && user.username.equals("Mino")) {
                    handler = new SignOutRequestHandler(user, parameters);
                } else {
                    throw new ValidatorError(6);
                }

                NewRelic.setTransactionName("API", function);

                requestResponse = handler.process();

                Integer cost = handler.unitCost;
                if (cost != null && !user.isSystemUser()) {

                    requestResponse.put("Cost", cost);

                    user.spentUnits(cost);

                    APIServer.getInstance().apiExpCounter.increment(cost);

                }

            } catch (ValidatorError e) {
                //The process() method can throw a MinoError (which should be encrypted and sent as the response)
                writer.println(Crypt.encrypt(APIServlet.addTimeToResponse(e.error).toString(), encryptionKey, iv));
                return;
            }

            //If the RequestHandler did not throw an error then it set requestResponse to a JSONObject detailing it's output
            String encryptedResponse = Crypt.encrypt(APIServlet.addTimeToResponse(requestResponse).toString(), encryptionKey, iv);
            writer.println(encryptedResponse);

            // Get elapsed time in milliseconds and output
            Long elapsedTimeMillis = System.currentTimeMillis() - start;
            NewRelic.recordResponseTimeMetric(function, elapsedTimeMillis);

        } catch (Exception e1) {
            ServerDaemon.error(e1);
            writer.println(APIServlet.addTimeToResponse(new ValidatorError(5).error).toString());
            return;
        }

    }
}