'use strict';

var response = require('./res');
var con = require('./conn');

//absen
exports.absen = function(req, res) {
    var ruang = req.params.ruang;
    var nrp = req.params.nrp;
    con.connect(function(err) {
        var query = "SELECT * FROM meetings WHERE kode_matkul = ? AND start_date <= NOW() AND end_date >= NOW()";
        con.query(query, [nrp], function (err, result, fields) {
            if(result.length == 0) response.err('Kelas tidak ditemukan atau belum dimulai', res);
            else{
                var query = "SELECT * FROM participants WHERE kode_matkul = ? AND nrp = ?";
                con.query(query, [kodeMatkul, nrp], function (err, result, fields) {
                    if(result.length == 0) response.err('Maaf, anda bukan peserta kelas', res);
                    else{
                        response.ok(result, res);
                    }
                    console.log(result);
                });
            }
        });
    });
}

exports.tambahMahasiswa = function(req, res) {
    //console.log(req)
    var nrp = req.body.nrp;
    var name = req.body.name;
    var password = req.body.password;

    var query = "SELECT * FROM mahasiswas WHERE nrp = ?";
    con.query(query, [nrp], function (err, result, fields) {
        if(result.length > 0) response.err('Mahasiswa sudah ada bro', res);
        else{
            var query = "INSERT INTO mahasiswas(nrp, name, password) VALUES(?, ?, ?)";
            con.query(query, [nrp, name, password], function (err, result, fields) {
                if(err) response.err('Maaf, ada error bro', res);
                response.ok(result, res);
            });
        }
    });
}

exports.tambahPeserta = function(req, res) {
    var nrp = req.params.nrp;
    var kodeMatkul = req.params.kodeMatkul;

    var query = "SELECT * FROM participants WHERE nrp = ? AND kode_matkul = ?";
    con.query(query, [nrp, kodeMatkul], function (err, result, fields) {
        if(result.length > 0) response.err('Mahasiswa sudah jadi peserta bro', res);
        else{
            var query = "SELECT * FROM mahasiswas WHERE nrp = ?";
            con.query(query, [nrp], function (err, result, fields) {
                if(result.length == 0) response.err('Mahasiswanya jangan ngawur bro', res);
                else{
                    var query = "SELECT * FROM matkuls WHERE kode = ?";
                    con.query(query, [kodeMatkul], function (err, result, fields) {
                        if(result.length == 0) response.err('Matkulnya jangan ngawur bro', res);
                        else{
                            var query = "INSERT INTO participants(nrp, kode_matkul) VALUES(?, ?)";
                            con.query(query, [nrp, kodeMatkul], function (err, result, fields) {
                                if(err) response.err('Maaf, ada error bro', res);
                                response.ok(result, res);
                            });
                        }
                    });
                }
            });
        }
    });
}

exports.tambahMatkul = function(req, res) {
    var kodeMatkul = req.body.kodeMatkul;
    var name = req.body.name;
    var kelas = req.body.kelas;
    var semester = req.body.semester;

    var query = "SELECT * FROM matkuls WHERE kelas = ? AND kode = ?";
    con.query(query, [kelas, kodeMatkul], function (err, result, fields) {
        if(result.length > 0) response.err('Matkul sudah ada ternyata bro', res);
        else{
            var query = "INSERT INTO matkuls(kode, name, kelas, semester) VALUES(?, ?, ?, ?)";
            con.query(query, [kodeMatkul, name, kelas, semester], function (err, result, fields) {
                if(err) response.err('Maaf, ada error bro', res);
                response.ok(result, res);
            });
        }
    });
}

exports.tambahJadwal = function(req, res) {
    var kodeMatkul = req.body.kodeMatkul;
    var day = req.body.pertemuan;
    var ruang = req.body.ruang;
    var masuk = req.body.masuk;
    var selesai = req.body.selesai;

    var query = "SELECT * FROM meetings WHERE ruang = ? AND start_date >= ? AND end_date <= ?";
    con.query(query, [ruang, masuk, selesai], function (err, result, fields) {
        console.log(result);
        if(result.length > 0) response.err('Kelas dah dipake bro', res);
        else{
            var query = "INSERT INTO meetings(kode_matkul, day, ruang, start_date, end_date) VALUES(?, ?, ?, ?, ?)";
            con.query(query, [kodeMatkul, day, ruang, masuk, selesai], function (err, result, fields) {
                if(err) response.err('Maaf, ada error bro', res);
                response.ok(result, res);
            });
        }
    });
}
