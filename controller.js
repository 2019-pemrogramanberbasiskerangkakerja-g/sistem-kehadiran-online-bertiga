'use strict';

var response = require('./res');
var db = require('./conn');

//absen
exports.absen = function(req, res) {
    var ruang = req.params.ruang;
    var nrp = req.params.nrp;

    var read = db.read()
    var row = db.get('attendances')
                .find({ ruang: ruang, nrp: nrp })
                .value()

    if(row == undefined){
        var insert = db.get('attendances')
                    .push({ id_meeting: row.id_meeting, ruang: ruang, nrp: nrp, absen_at: Date(Date.now()) })
                    .write()
        response.ok(insert, res)
    }
    else
        response.err('Kamu dah absen bro', res);
};

//rekap kuliah per semester
exports.rekapPerSemester = function(req, res) {
    var kodeMatkul = parseInt(req.params.kodeMatkul);

    response.err('on progress hehe', res);
};

//rekap kuliah per pertemuan
exports.rekapPerPertemuan = function(req, res) {
    var kodeMatkul = parseInt(req.params.kodeMatkul);
    var day = req.params.day;

    response.err('on progress hehe', res);
};

//rekap mhs per kuliah
exports.rekapMhsPerKuliah = function(req, res) {
    var kodeMatkul = parseInt(req.params.kodeMatkul);
    var nrp = parseInt(req.params.nrp);

    response.err('on progress hehe', res);
};

//rekap mhs per semester
exports.rekapMhsPerSemester = function(req, res) {
    var semester = parseInt(req.params.semester);
    var nrp = parseInt(req.params.nrp);

    response.err('on progress hehe', res);
};

exports.tambahMahasiswa = function(req, res) {
    var nrp = parseInt(req.body.nrp);
    var name = req.body.name;
    var password = req.body.password;

    var read = db.read()
    var row = db.get('mahasiswas')
                .find({ nrp: nrp })
                .value()

    if(row == undefined){
        var insert = db.get('mahasiswas')
                    .push({ nrp: nrp, name: name, password: password })
                    .write()
        response.ok(insert, res)
    }
    else
        response.err('Mahasiswa sudah ada bro', res);
};

exports.tambahPeserta = function(req, res) {
    var nrp = parseInt(req.params.nrp);
    var kodeMatkul = parseInt(req.params.kodeMatkul);

    var read = db.read()
    var row = db.get('participants')
                .find({ nrp: nrp, kode_matkul: kodeMatkul })
                .value()

    if(row == undefined){
        var row = db.get('mahasiswas')
                        .find({ nrp: nrp })
                        .value()

        if(row == undefined) response.err('Mahasiswa jangan ngawur bro', res);
        else{
            var insert = db.get('participants')
                        .push({ nrp: nrp, kode_matkul: kodeMatkul })
                        .write()
            response.ok(insert, res)
        }
    }
    else
        response.err('Mahasiswa sudah jadi peserta bro', res);
};

exports.tambahMatkul = function(req, res) {
    var kodeMatkul = req.body.kodeMatkul;
    var name = req.body.name;
    var kelas = req.body.kelas;

    var read = db.read()
    var row = db.get('matkuls')
                .find({ kode_matkul: kodeMatkul, kelas: kelas })
                .value()

    if(row == undefined){
        var insert = db.get('matkuls')
                    .push({ kode_matkul: kodeMatkul, name: name, kelas: kelas })
                    .write()
        response.ok(insert, res)
    }
    else
        response.err('Matkul sudah ada bro', res);
};

// belum
exports.tambahJadwal = function(req, res) {
    var kodeMatkul = req.body.kodeMatkul;
    var day = req.body.day;
    var ruang = req.body.ruang;
    var masuk = req.body.masuk;
    var selesai = req.body.selesai;

    var read = db.read()
    var row = db.get('meetings')
                .find({ ruang: ruang, masuk: masuk })
                .value()

    if(row == undefined){
        var insert = db.get('meetings')
                    .push({ kode_matkul: kodeMatkul, day: day, ruang: ruang, masuk: masuk, selesai: selesai })
                    .write()
        response.ok(insert, res)
    }
    else
        response.err('Kelas dah kepake bro', res);
};
