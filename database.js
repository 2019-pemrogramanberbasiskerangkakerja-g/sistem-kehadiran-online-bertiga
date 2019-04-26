var mysql      = require('mysql');
var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'sikeline'
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");

    var query = "CREATE TABLE users(" +
        "nrp VARCHAR(30) PRIMARY KEY, name VARCHAR(255), password VARCHAR(255)" +
    ")";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('User table created successfully');
    });

    var query = "CREATE TABLE dosens(" +
        "nip VARCHAR(30) PRIMARY KEY, name VARCHAR(255), password VARCHAR(255)" +
    ")";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Dosen table created successfully');
    });

    var query = "CREATE TABLE matkuls(" +
        "kode VARCHAR(20) PRIMARY KEY, name VARCHAR(255), " +
    ")";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Matkul table created successfully');
    });
});

// con.end();
