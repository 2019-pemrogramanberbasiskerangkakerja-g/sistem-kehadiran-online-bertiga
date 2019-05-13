'use strict';

var response = require('./res');
var db = require('./conn');

//absen
exports.absen = function(req, res) {
    var ruang = req.params.ruang;
    var nrp = parseInt(req.params.nrp);

    var read = db.read()
    var row = db.get('meetings')
                .find({ ruang: ruang })
                .value()

    if(row){
        console.log(row)
        var matkul = row.kode_matkul
        var mulai_kelas = row.masuk.split(':')
        var selesai_kelas = row.selesai.split(':')
        var id_meeting = row.id_meeting
        //kelas = row.kelas

        var row = db.get('participants')
                    .find({ kode_matkul: matkul, nrp: nrp })
                    .value()
        
        if(row){
            var waktu_absen = new Date()
            var jam_absen = waktu_absen.getHours()
            var menit_absen = waktu_absen.getMinutes()
            var jam_mulai_kelas = mulai_kelas[0]
            var menit_mulai_kelas = mulai_kelas[1]
            var jam_selesai_kelas = selesai_kelas[0]
            var menit_selesai_kelas = selesai_kelas[1]

            if(((jam_absen = jam_mulai_kelas && menit_absen >= menit_mulai_kelas) || jam_absen > jam_mulai_kelas) && (jam_absen < jam_selesai_kelas || (jam_absen = jam_selesai_kelas && menit_absen <= menit_selesai_kelas))) {
                var row = db.get('attendances')
                .find({ ruang: ruang, nrp: nrp })
                .value()
            
                if(row == undefined){
                    var insert = db.get('attendances')
                                .push({ id_meeting: id_meeting, ruang: ruang, nrp: nrp, absen_at: waktu_absen })
                                .write()
                    response.ok(insert, res)
                }
                else
                    response.err('Kamu dah absen bro', res)
                }
            else
                response.err('Gabisa absen sekarang bro', res)
            }
        else
            response.err('Kamu ga di kelas itu bro', res)
    }
    else
        response.err('Ga ada kelas disana bro', res);
};

//rekap kuliah per semester
exports.rekapPerSemester = function(req, res) {
    var kodeMatkul = parseInt(req.params.kodeMatkul);

    var read = db.read()
    var result = db.get('meetings')
                .filter({ kode_matkul: kodeMatkul })
                .value()

    if(result){
        response.ok(result, res)
    }
    else
        response.err('Internal Server Error', res);
    //response.err('on progress hehe', res);
};

//rekap kuliah per pertemuan
exports.rekapPerPertemuan = function(req, res) {
    var kodeMatkul = parseInt(req.params.kodeMatkul);
    var day = req.params.day;

    var read = db.read()
    var result = db.get('meetings')
                .filter({ kode_matkul: kodeMatkul, day:day })
                .value()

    if(result){
        response.ok(result, res)
    }
    else
        response.err('Internal Server Error', res);

    //response.err('on progress hehe', res);
};

//rekap mhs per kuliah
exports.rekapMhsPerKuliah = function(req, res) {
    var kode_matkul = parseInt(req.params.kodeMatkul);
    var nrp = parseInt(req.params.nrp);
    var final = []

    var read = db.read()
    var row = db.get('participants')
                .filter({ kode_matkul: kode_matkul })
                .filter({ nrp: nrp })
                .value()
    
    if(row){
        row.forEach(function(idx) {
            var result = db.get('meetings')
                            .filter({ kode_matkul: idx.kode_matkul })
                            .value()
            final.push(result)
        })
        response.ok(final, res)
    }
    else
        response.err('Internal Server Error', res);

    //response.err('on progress hehe', res);
};

//rekap mhs per semester
exports.rekapMhsPerSemester = function(req, res) {
    var semester = parseInt(req.params.semester);
    var nrp = parseInt(req.params.nrp);
    var result = []
    var final = []

    var read = db.read()
    var row = db.get('matkuls')
                .filter({ semester: semester })
                .value()

    console.log(row)

    if(row){
        row.forEach(function(idx) {
            result.push(db.get('participants')
                            .filter({ kode_matkul: idx.kode_matkul, nrp: nrp })
                            .value())
        })

        if(result){
            result.forEach(function(idx) {
                var results = db.get('meetings')
                    .filter({ kode_matkul: idx.kode_matkul })
                    .value()
                final.push(results)
            })
            response.ok(final, res)
        }
        else
            response.err('Internal Server Error', res)
    }
    else
        response.err('Internal Server Error', res)

    //response.err('on progress hehe', res);
};

exports.tambahMahasiswa = function(req, res) {
    //console.log(req)
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
        console.log(row)
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
    var kodeMatkul = parseInt(req.body.kodeMatkul);
    var name = req.body.name;
    var kelas = req.body.kelas;
    var semester = req.body.semester;

    var read = db.read()
    var row = db.get('matkuls')
                .find({ kode_matkul: kodeMatkul, kelas: kelas })
                .value()

    if(row == undefined){
        var insert = db.get('matkuls')
                    .push({ kode_matkul: kodeMatkul, name: name, kelas: kelas, semester: semester })
                    .write()
        response.ok(insert, res)
    }
    else
        response.err('Matkul sudah ada bro', res);
};

exports.tambahJadwal = function(req, res) {
    var kodeMatkul = parseInt(req.body.kodeMatkul);
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

exports.tambahDosen = function(req, res) {
    var nip = parseInt(req.body.nip);
    var name = req.body.name;
    var password = req.body.password;

    var read = db.read()
    var row = db.get('dosens')
                .find({ nip: nip })
                .value()

    if(row == undefined){
        var insert = db.get('dosens')
                    .push({ nip: nip, name: name, password: password })
                    .write()
        response.ok(insert, res)
    }
    else
        response.err('Dosen sudah ada bro', res);
};