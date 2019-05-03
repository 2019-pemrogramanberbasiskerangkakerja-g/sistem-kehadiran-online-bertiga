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

    var query = "SET FOREIGN_KEY_CHECKS=0";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Foreign key checks disabled successfully');
    });

    var query = "DROP TABLE matkuls";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Matkul table dropped successfully');
    });

    var query = "DROP TABLE meetings";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Meeting table dropped successfully');
    });

    var query = "DROP TABLE attendances";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Attendance table dropped successfully');
    });

    var query = "DROP TABLE participants";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Participant table dropped successfully');
    });

    var query = "DROP TABLE dosens";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Dosen table dropped successfully');
    });

    var query = "DROP TABLE mahasiswas";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Mahasiswa table dropped successfully');
    });

    var query = "SET FOREIGN_KEY_CHECKS=1";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Foreign key checks enabled successfully');
    });

});

// con.end();
