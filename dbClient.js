const { Client } = require('pg');

const dbClient = new Client({
	user: "swbae01",
	password: "qlfyd",
	host: "oneitacademy.com",
	port: 5432,
	database: "academyhomepage"
})

dbClient.connect(err => {
	if (err) {
		console.error('connection error', err.stack)
	} else {
		console.log('connected')
	}
}); 

module.exports = dbClient;
