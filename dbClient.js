const { Client } = require('pg');

const dbClient = new Client({
	user: "swbae01",
	password: "qlfyd",
	host: "43.200.81.134",
	port: 5432,
	database: "academyhomepage"
})

dbClient.connect(err => {
	if (err) {
		console.error('connection error', err.stack)
	} else {
		console.log('DB connected')
	}
}); 

module.exports = dbClient;
