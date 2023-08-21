const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	date: {
		type: String
	}
});

module.exports = mongoose.model('Newsletter', newsletterSchema);