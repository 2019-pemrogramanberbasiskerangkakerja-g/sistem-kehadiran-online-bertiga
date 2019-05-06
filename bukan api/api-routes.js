var express = require('express');
var app = express();

var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');

var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'sikeline'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.post('/absen/:ruang/:nrp', function(req, res){
    var ruang = req.params.ruang;
    var nrp = req.params.nrp;
    con.connect(function(err) {
        var query = "SELECT * FROM meetings WHERE kode_matkul="+ruang+" AND start_date <= NOW() AND end_date >= NOW()";
        con.query(query, function (err, result, fields) {
            if(result.length == 0) res.send('Kelas tidak ditemukan atau belum dimulai');
            else{
                var query = "SELECT * FROM participants WHERE kode_matkul="+ruang+" AND nrp="+nrp;
                con.query(query, function (err, result, fields) {
                    if(result.length == 0) res.send('Maaf, anda bukan peserta kelas');
                    else{
                        res.send(result);
                    }
                    console.log(result);
                });
            }
        });
    });
})

var server = app.listen(3000, function () { // This starts the server
    console.log("Server listening to request on port 3000");
});
