const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feeSchema = new Schema({
		name: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		},
		courses: {
			type: String
	},
	date: {
			type: String
		}
	});

module.exports = mongoose.model('Fee', feeSchema);