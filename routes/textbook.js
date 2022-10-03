const express = require("express");
const router = express.Router();

var app = express();

router.get('/html-01', function (req, res) {
	res.sendFile(__dirname + "/html/textbook/html-01.html");
})


module.exports = router;

