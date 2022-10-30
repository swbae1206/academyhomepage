const express = require("express");
const router = express.Router();

var app = express();

router.get('/html', function (req, res) {
	res.sendFile(__dirname + "/html/textbook/html.html");
})

router.get('/css', function (req, res) {
	res.sendFile(__dirname + "/html/textbook/css.html");
})


module.exports = router;

