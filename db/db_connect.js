const Sequelize = require('sequelize'),
      { MYSQL_CONF } = require('../configs/db');

const seq = new Sequelize(...MYSQL_CONF.conf, MYSQL_CONF.base);

// seq.sync({
// 	//force: true // => 强制同步
// }).then(() => {
// 	console.log('The table has been synchronised into database successfully');
// 	process.exit();
// });

module.exports = seq;