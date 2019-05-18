'use strict';

var response = require('./res');
var con = require('./conn');

//absen
exports.absen = function(req, res) {
    var ruang = req.params.ruang;
    var nrp = req.params.nrp;
    con.connect(function(err) {
        var query = "SELECT * FROM meetings WHERE ruang = ? AND start_date <= NOW() AND end_date >= NOW()";
        con.query(query, [ruang], function (err, result, fields) {
            console.log(result[0].kode_matkul)
            var meeting = result[0].id
            if(result.length == 0) response.err('Kelas tidak ditemukan atau belum dimulai', res);
            else{
                var query = "SELECT * FROM participants WHERE kode_matkul = ? AND nrp = ?";
                con.query(query, [result[0].kode_matkul,nrp], function (err, result, fields) {
                    if(result.length == 0) response.err('Maaf, anda bukan peserta kelas', res);
                    else{
                        var query = "INSERT INTO attendances(id_meeting, nrp) VALUES(?, ?)";
                        con.query(query, [meeting,nrp], function (err, result, fields) {
                            if(err) response.err('Maaf, ada error bro', res);
                            response.ok(result, res);
                        });
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

exports.tambahDosen = function(req,res) {
    var nip = req.body.nip;
    var name = req.body.name;
    var password = req.body.password;

    var query = "SELECT * FROM dosens WHERE nip = ?";
    con.query(query, [nip], function (err, result, fields) {
        if(result.length > 0) response.err('Dosen sudah ada bro', res);
        else{
            var query = "INSERT INTO dosens(nip, name, password) VALUES(?, ?, ?)";
            con.query(query, [nip, name, password], function (err, result, fields) {
                if(err) response.err('Maaf, ada error bro', res);
                response.ok(result, res);
            });
        }
    });
}

//rekap kuliah per semester
exports.rekapPerSemester = function(req, res) {
    var kodeMatkul = req.params.kodeMatkul;

    var query = "SELECT m.kode, m.name, m.kelas, p.nrp, COUNT(a.nrp) AS jumlah_masuk FROM matkuls m, meetings mt, attendances a, participants p WHERE m.kode = ? AND m.kode = mt.kode_matkul AND mt.id = a.id_meeting AND a.nrp = p.nrp AND p.kode_matkul = m.kode GROUP BY p.nrp";
    con.query(query, [kodeMatkul], function (err, result, fields) {
        console.log(result)
        if(result.length <=0 ) response.err('Maaf, ada error bro', res);
        else
            response.ok(result, res);    
    });
};

//rekap kuliah per pertemuan
exports.rekapPerPertemuan = function(req, res) {
    var kodeMatkul = req.params.kodeMatkul;
    var day = req.params.day;

    var query = "SELECT m.kode, m.name, m.kelas, mt.day, a.nrp FROM matkuls m, meetings mt, attendances a WHERE m.kode = ? AND m.kode = mt.kode_matkul AND mt.day = ? AND mt.id = a.id_meeting";
    con.query(query, [kodeMatkul, day], function (err, result, fields) {
        if(result.length <=0 ) response.err('Maaf, ada error bro', res);
        else
            response.ok(result, res);    
    });
};

//rekap mhs per kuliah
exports.rekapMhsPerKuliah = function(req, res) {
    var kodeMatkul = req.params.kodeMatkul;
    var nrp = req.params.nrp;

    var query = "SELECT m.kode, m.name, m.kelas, a.nrp, COUNT(a.nrp) AS jumlah_masuk FROM matkuls m, meetings mt, attendances a WHERE m.kode = ? AND m.kode = mt.kode_matkul AND mt.id = a.id_meeting AND a.nrp = ? GROUP BY a.nrp";
    con.query(query, [kodeMatkul, nrp], function (err, result, fields) {
        if(result.length <=0 ) response.err('Maaf, ada error bro', res);
        else
            response.ok(result, res);    
    });
};

//rekap mhs per semester
exports.rekapMhsPerSemester = function(req, res) {
    var semester = req.params.semester;
    var nrp = req.params.nrp;

    var query = "SELECT m.kode, m.name, m.kelas, m.semester, a.nrp, COUNT(a.nrp) AS jumlah_masuk FROM matkuls m, meetings mt, attendances a WHERE m.semester = ? AND m.kode = mt.kode_matkul AND mt.id = a.id_meeting AND a.nrp = ? GROUP BY m.kode";
    con.query(query, [semester, nrp], function (err, result, fields) {
        if(result.length <=0 ) response.err('Maaf, ada error bro', res);
        else
            response.ok(result, res);    
    });
};

