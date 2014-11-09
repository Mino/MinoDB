var errors = require('./errors');
var get_user_and_profile = require('./get_user_and_profile');

module.exports = function(requires_login){
	return function(req, res, next){

		var with_user = function(user){
			if(!user && requires_login){
				var validator = new FieldVal(null);
				validator.error(errors.NOT_SIGNED_IN)
	    		res.json(validator.end());
	    		return;
			} else {
				req.user = user;
				next();
			}
		}

		if(req.session.user_id){
			var user_id = req.session.user_id;
			get_user_and_profile({id: user_id},function(error,user_record,profile,live_profile){
				if(error || !user_record){
					with_user(null);
					return;
				}

				with_user(user);
				return;
			})			
		} else {
			with_user(null);
		}
	}
}