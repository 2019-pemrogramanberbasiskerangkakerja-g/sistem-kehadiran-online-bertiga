var express = require('express');
var app = express();

var template = require('./template');
var template = require('./api-routes');

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

app.get('/sikemas', function(req, res){
  res.render('home');
})

app.post('/mhs/auth', function(request, response) {
	var username = request.body.username;
  var password = md5(request.body.password);
  //console.log(password)
	if (username && password) {
		connection.query('SELECT * FROM mahasiswas WHERE nrp = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.mahasiswa = true;
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

app.post('/mhs/reg', function(request, response) {
  var username = request.body.username;
  var nama = request.body.nama;
  var password = md5(request.body.password);
	if (username && nama && password) {
		connection.query('INSERT INTO mahasiswas(nrp, name, password) VALUES (?,?,?)', [username, nama, password], function(error, results, fields) {
			if (!error) {
				request.session.mahasiswa = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Registration Failed');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username, Name and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.mahasiswa) {
        response.render('mhs/home', {
          NRP: request.session.username,
        })
	}
    else if (request.session.dosen) {
        response.render('dosen/home', {
          NIP: request.session.username,
        })
    }
    else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.get('/home', function(request, response) {
	if (request.session.mahasiswa || request.session.dosen) {
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

app.get('/mhs/register', function(req, res){
  res.render('mhs/register')
});

app.get('/mhs/logout', function(req, res){
  req.session.mahasiswa = false;
  res.redirect('/mhs/login');
});

app.get('/dosen/login', function(req, res){
  res.render('dosen/login')
});

app.get('/dosen/register', function(req, res){
  res.render('dosen/register')
});

app.get('/dosen/logout', function(req, res){
req.session.dosen = false;
res.redirect('/dosen/login');
});

app.post('/dosen/auth', function(request, response) {
var username = request.body.username;
  var password = md5(request.body.password);
  //console.log(password)
if (username && password) {
  connection.query('SELECT * FROM dosens WHERE nip = ? AND password = ?', [username, password], function(error, results, fields) {
    if (results.length > 0) {
      request.session.dosen = true;
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

app.post('/dosen/reg', function(request, response) {
  var username = request.body.username;
  var nama = request.body.nama;
  var password = md5(request.body.password);
	if (username && nama && password) {
		connection.query('INSERT INTO dosens(nip, name, password) VALUES (?,?,?)', [username, nama, password], function(error, results, fields) {
			if (!error) {
				request.session.dosen = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Registration Failed');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username, Name and Password!');
		response.end();
	}
});

var server = app.listen(3000, function () { // This starts the server
    console.log("Server engine squirelly listening to request on port 3000");
});
