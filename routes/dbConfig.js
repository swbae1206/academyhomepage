const dbSetting = require('./dbSetting');
const { Client } = require('pg');

const dbClient = new Client({
	user: dbSetting.user,
	password: dbSetting.password,
	host: dbSetting.host,
	port: dbSetting.port,
	database: dbSetting.database
})

dbClient.connect(err => {
	if (err) {
		console.error('connection error', err.stack)
	} else {
		console.log('connected')
	}
}); 

module.exports = {
	dbClient: dbClient
}

