var logger = require('tracer').console();
var globals = require('./globals');

globals.db_address = 'mongodb://127.0.0.1:27017/minodb_tests';

describe('MinoDB', function() {
	before(require("./setup.js"));

	require('./models.js');
	require('./api/api.js');

});
