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
};
