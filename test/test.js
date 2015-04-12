var logger = require('mino-logger');
var globals = require('./globals');

globals.db_address = 'mongodb://127.0.0.1:27017/minodb_tests';

describe('MinoDB', function() {
	before(require("./setup.js"));

	require('./initial_setup.js');
	require('./Models/models.js');
	require('./api/api.js');
    require('./plugins/plugins.js');
    require('./signals/signals.js');
    require('./utils/validators');
    require('./utils/class_to_string');
    require('./permissions/PathPermissionChecker');

    after(function(){
		globals.mino.close();
    });
});
