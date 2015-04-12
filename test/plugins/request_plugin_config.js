var logger = require('mino-logger');
var request = require('supertest');


module.exports = function(name, server, callback) {
	var agent = request.agent(server);

	agent
		.post('/mino/ajax/login')
		.send({username_or_email: 'testuser', password: 'my_password'})
		.expect(200)
		.end(function(err, res) {

			agent
				.get('/mino/admin/plugin_config/' + name + '/')
				.expect(200)
				.end(function(err, res) {
					logger.debug(err, res.body, res.text);
					callback(err, res.text);
				});
		});
};