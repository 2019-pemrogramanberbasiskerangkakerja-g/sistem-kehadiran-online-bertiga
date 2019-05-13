'use strict';

var response = require('./res');
var con = require('./conn');

//absen
exports.absen = function(req, res) {
    var ruang = req.params.ruang;
    var nrp = req.params.nrp;
    con.connect(function(err) {
        var query = "SELECT * FROM meetings WHERE kode_matkul="+ruang+" AND start_date <= NOW() AND end_date >= NOW()";
        con.query(query, function (err, result, fields) {
            if(result.length == 0) response.err('Kelas tidak ditemukan atau belum dimulai');
            else{
                var query = "SELECT * FROM participants WHERE kode_matkul="+ruang+" AND nrp="+nrp;
                con.query(query, function (err, result, fields) {
                    if(result.length == 0) response.err('Maaf, anda bukan peserta kelas');
                    else{
                        response.ok(result);
                    }
                    console.log(result);
                });
            }
        });
    });
};

exports.tambahMahasiswa = function(req, res) {
    //console.log(req)
    var nrp = req.body.nrp;
    var name = req.body.name;
    var password = req.body.password;

    var query = "SELECT * FROM mahasiswas WHERE nrp="+nrp;
    con.query(query, function (err, result, fields) {
        if(result.length > 0) response.err('Mahasiswa sudah ada bro');
        else{
            var query = "INSERT INTO mahasiswas(nrp, name, password) VALUES("+nrp+", "+name+", "+password+")";
            con.query(query, function (err, result, fields) {
                if(err) response.err('Maaf, terjadi error');
                response.ok(result);
            });
        }
    });
};
