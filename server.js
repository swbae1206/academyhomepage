// node_modules의 express 패키지를 가져온다.
var express = require('express')
const cors = require('cors');
var requestIp = require('request-ip');
const { getFees, createNewFee, getCounselings, createNewCounseling, getNewsletters, createNewNewsletter } = require('./controllers');
 
// const dbClient = require("./dbClient");

var favicon = require('serve-favicon');

//app이라는 변수에 express 함수의 변환 값을 저장한다.
var app = express()

const mongoose = require('mongoose');
const connectDB = require('./dbConn');

//환경변수에서 port를 가져온다. 환경변수가 없을시 5050포트를 지정한다.
var port = app.listen(process.env.PORT || 3500);

connectDB();

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

app.get('/fee', getFees);
app.post('/fee', createNewFee)
app.get('/counseling', getCounselings)
app.post('/counseling', createNewCounseling)
app.get('/newsletter', getNewsletters)
app.post('/newsletter', createNewNewsletter)

// express 서버를 실행할 때 필요한 포트 정의 및 실행 시 callback 함수를 받습니다
mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(port, function () {
		console.log('start! express server');
	})
});