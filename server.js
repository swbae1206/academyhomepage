// node_modules의 express 패키지를 가져온다.
var express = require('express')
const cors = require('cors');
var requestIp = require('request-ip');

const dbClient = require("./dbClient");

var favicon = require('serve-favicon');

//app이라는 변수에 express 함수의 변환 값을 저장한다.
var app = express()

//환경변수에서 port를 가져온다. 환경변수가 없을시 5050포트를 지정한다.
var port = app.listen(process.env.PORT || 3500);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let publicDir = require('path').join(__dirname, "/public");
console.log(publicDir);

app.use(express.static('public'));

app.use(favicon(require('path').join(__dirname, 'public', 'favicon.ico')));


//REST API의 한가지 종류인 GET 리퀘스트를 정의하는 부분입니다.
//app.get이라고 작성했기 때문에 get 요청으로 정의가 되고
//app.post로 작성할 경우 post 요청으로 정의가 됩니다.
//REST API의 종류 (get, post, update, delete 등등)을 사용하여 End Point를 작성하실 수 있습니다.

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/index.html");
})
app.get('/index', function (req, res) {
	res.sendFile(__dirname + "/index.html");
})
app.get('/index.html', function (req, res) {
	res.sendFile(__dirname + "/index.html");
})

app.get('/naver140934d58ca2161fd52a754915c20568.html', function (req, res) {
	res.sendFile(__dirname + "/naver140934d58ca2161fd52a754915c20568.html");
})

app.get('/robots.txt', function (req, res) {
	res.sendFile(__dirname + "/robots.txt");
})

app.get('/rss.xml', function (req, res) {
	res.sendFile(__dirname + "/rss.xml");
})

app.get('/sitemap.xml', function (req, res) {
	res.sendFile(__dirname + "/sitemap.xml");
})



app.get('/counseling', function (req, res) {

	const queryText = 'select * from counseling';
	const values = [
	];
	dbClient
		.query(queryText, values)
		.then((result) => {
			res.send(JSON.stringify(result.rows));
		})
		.catch(e => {
			res.status(500).send({ data: e.message });
		});
})

app.post('/counseling', function (req, res) {

	const queryText = 'INSERT INTO counseling (name, phone, email, date, ip) VALUES($1, $2, $3, $4, $5)';
	const values = [
		req.body.name,
		req.body.phone,
		req.body.email,
		getDatetime(),
		requestIp.getClientIp(req)
	];
	dbClient
		.query(queryText, values)
		.then((result) => {
			console.log("success");
			res.end();
		})
		.catch(e => {
			res.status(500).send({ data: e.message });
		});
})

app.post('/newsletter', function (req, res) {
	const queryText = 'INSERT INTO newsletter (email, date, ip) VALUES($1, $2, $3)';
	const values = [
		req.body.email,
		getDatetime(),
		requestIp.getClientIp(req)
	];
	dbClient
		.query(queryText, values)
		.then((result) => {
			console.log("success");
			res.end();
		})
		.catch(e => {
			res.status(500).send({ data: e.message });
		});
})

app.post('/fee', function (req, res) {
	const queryText = 'INSERT INTO fee (name, phone, date, ip, courses) VALUES($1, $2, $3, $4, $5)';
	const values = [
		req.body.name,
		req.body.phone,
		getDatetime(),
		requestIp.getClientIp(req),
		req.body.courses
	];
	dbClient
		.query(queryText, values)
		.then((result) => {
			console.log("success");
			res.end();
		})
		.catch(e => {
			res.status(500).send({ data: e.message });
		});
})

function getDatetime() {
	let i = new Date();
	i = i.getFullYear() + "-"
		+ (i.getMonth() + 1) + "-"
		+ i.getDate() + " "
		+ i.getHours() + ":"
		+ i.getMinutes() + ":"
		+ i.getSeconds();
	return i;
}


const textbookRouter = require('./routes/textbook');
app.use('/textbook', textbookRouter);

// express 서버를 실행할 때 필요한 포트 정의 및 실행 시 callback 함수를 받습니다
app.listen(port, function () {
	console.log('start! express server');
})