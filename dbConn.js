const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb+srv://swbae77:vkqur47@cluster0.q4bzcw7.mongodb.net/academyhomepage?retryWrites=true&w=majority", {
			useUnifiedTopology: true,
			useNewUrlParser: true
		});
	} catch (err) {
		console.error(err);
	}
}

module.exports = connectDB;