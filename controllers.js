const Fee = require('./models/fee');
const Counseling = require('./models/counseling');
const Newsletter = require('./models/newsletter');

const coolsms = require('coolsms-node-sdk').default;

const getFees = async (req, res) => {
	const fees = await Fee.find();
	res.json(fees);
}

const createNewFee = async (req, res) => {
	try {
		const result = await Fee.create({
			name: req.body.name,
			phone: req.body.phone,
			courses: req.body.courses,
			date: req.body.date
		});

		const messageService = new coolsms("NCSWNH0CUNDBNHZP", "HE1R2EUUCYL13ATN1K5W9GYPV79IWA5X");
		messageService.sendOne({
			'to': '01085123770',
			'from': '01085123770',
			'text': 'Fee:' + req.body.phone + ":" + req.body.name + ":" + req.body.courses.slice(0, 20)
		});

		res.status(201).json(result);
	} catch (err) {
		console.log(err);
	}
}

const getCounselings = async (req, res) => {
	const counselings = await Counseling.find();
	res.json(counselings);
}

const createNewCounseling = async (req, res) => {
	try {
		const result = await Counseling.create({
			name: req.body.name,
			phone: req.body.phone,
			email: req.body.email,
			date: req.body.date
		});

		const messageService = new coolsms("NCSWNH0CUNDBNHZP", "HE1R2EUUCYL13ATN1K5W9GYPV79IWA5X");
		messageService.sendOne({
			'to': '01085123770',
			'from': '01085123770',
			'text': 'Counseling:' + req.body.phone + ":" + req.body.name
		});

		res.status(201).json(result);
	} catch (err) {
		console.log(err);
	}
}

const getNewsletters = async (req, res) => {
	const newsletters = await Newsletter.find();
	res.json(newsletters);
}

const createNewNewsletter = async (req, res) => {
	try {
		const result = await Newsletter.create({
			email: req.body.email,
			date: req.body.date
		});
		res.status(201).json(result);
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	getFees,
	createNewFee,
	getCounselings,
	createNewCounseling,
	getNewsletters,
	createNewNewsletter
}