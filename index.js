var express = require('express');
var app = express();
var Sqrl = require('squirrelly')

app.set('view engine', 'squirrelly')

var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var md5 = require('md5');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'sisabs'
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.post('/mhs/auth', function(request, response) {
	var username = request.body.username;
  var password = md5(request.body.password);
  console.log(password)
	if (username && password) {
		connection.query('SELECT * FROM mahasiswas WHERE nrp = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
    response.render('mhs/home', {
      NRP: request.session.username,
    })
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.get('/', function (req, res) {
    res.render('index', {
        name_1: 'Nirmala',
        nrp_1: '0511154000700',
        name_2: 'Ariiq Firanda N',
        nrp_2: '05111640000083',  
        name_3: 'Faizal Khilmi Muzakki',
        nrp_3: '05111640000120',
    })
})

app.get('/mhs/login', function(req, res){
    res.render('mhs/login')
});

app.get('/mhs/logout', function(req, res){
  req.session.loggedin = false;
  response.redirect('/mhs/login');
});

var server = app.listen(3000, function () { // This starts the server
    console.log("Server engine squirelly listening to request on port 3000");
});

Sqrl.definePartial("head_mhs", `
    <title>Login Mahasiswa</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
`);

Sqrl.definePartial("foot_mhs", `
    <script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
`);

Sqrl.definePartial("head", `
  <title>Squirelly Bertiga</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
  <style>
  body {
    font: 20px Montserrat, sans-serif;
    line-height: 1.8;
    color: #f5f6f7;
  }
  p {font-size: 16px;}
  .margin {margin-bottom: 45px;}
  .bg-1 {
    background-color: #1abc9c; /* Green */
    color: #ffffff;
  }
  .bg-2 {
    background-color: #474e5d; /* Dark Blue */
    color: #ffffff;
  }
  .bg-3 {
    background-color: #ffffff; /* White */
    color: #555555;
  }
  .bg-4 {
    background-color: #2f2f2f; /* Black Gray */
    color: #fff;
  }
  .container-fluid {
    padding-top: 70px;
    padding-bottom: 70px;
  }
  .navbar {
    padding-top: 15px;
    padding-bottom: 15px;
    border: 0;
    border-radius: 0;
    margin-bottom: 0;
    font-size: 12px;
    letter-spacing: 5px;
  }
  .navbar-nav  li a:hover {
    color: #1abc9c !important;
  }
  </style>
`)

Sqrl.definePartial("foot", `
<!-- Footer -->
<footer class="container-fluid bg-4 text-center">
  <p>Test site <a href="#">Made by team bertiga.</a></p>
</footer>
`)
