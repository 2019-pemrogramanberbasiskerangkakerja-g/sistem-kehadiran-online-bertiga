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

    var query = "CREATE TABLE mahasiswas(" +
        "nrp VARCHAR(30) PRIMARY KEY, name VARCHAR(255), password VARCHAR(255)" +
    ")";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Mahasiswa table created successfully');
    });

    var query = "CREATE TABLE dosens(" +
        "nip VARCHAR(30) PRIMARY KEY, name VARCHAR(255), password VARCHAR(255)" +
    ")";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Dosen table created successfully');
    });

    var query = "CREATE TABLE matkuls(" +
        "kode VARCHAR(20) PRIMARY KEY, name VARCHAR(255), kelas CHAR(1), semester CHAR(1), nip VARCHAR(30), FOREIGN KEY (nip) REFERENCES dosens(nip)" +
    ")";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Matkul table created successfully');
    });

    var query = "CREATE TABLE meetings(" +
        "id INT AUTO_INCREMENT PRIMARY KEY, kode_matkul VARCHAR(20), ruang VARCHAR(6), day VARCHAR(10), start_date DATETIME, end_date DATETIME,  FOREIGN KEY (kode_matkul) REFERENCES matkuls(kode)" +
    ")";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Meeting table created successfully');
    });

    var query = "CREATE TABLE attendances(" +
        "id INT AUTO_INCREMENT PRIMARY KEY, id_meeting INT, nrp VARCHAR(30), FOREIGN KEY (nrp) REFERENCES mahasiswas(nrp), FOREIGN KEY (id_meeting) REFERENCES meetings(id)" +
    ")";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Attendace table created successfully');
    });

    var query = "CREATE TABLE participants(" +
        "id INT AUTO_INCREMENT PRIMARY KEY, kode_matkul VARCHAR(20), nrp VARCHAR(30), FOREIGN KEY (kode_matkul) REFERENCES matkuls(kode), FOREIGN KEY (nrp) REFERENCES mahasiswas(nrp)" +
    ")";
    con.query(query, function (error, results) {
      if (error) throw error;
      console.log('Participant table created successfully');
    });


});

// con.end();
