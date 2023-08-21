const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const counselingSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String
	},
	date: {
		type: String
	}
});

module.exports = mongoose.model('Counseling', counselingSchema);