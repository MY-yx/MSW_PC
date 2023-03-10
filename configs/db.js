const ENV = require('./env');

module.exports = {
	MYSQL_CONF: {
		base: {
			host: 'localhost',
			dialect: 'mysql',
			pool: {
				max: 5,
				min: 0,
				idle: 10000
			}
		},
		conf: ['node_jsplusplus', 'root', ENV.isPrd ? 'xxx' : 'root1234']
	}
};