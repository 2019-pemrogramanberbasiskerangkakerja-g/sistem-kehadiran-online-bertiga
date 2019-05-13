'use strict';

module.exports = function(app) {
    var FbpApi = require('./controller');

    app.route('/absen/:ruang/:nrp')
        .post(FbpApi.absen);

    // app.route('/rekap/:kodeMatkul')
    //     .get(FbpApi.rekapPerSemester);
    //
    // app.route('/rekap/:kodeMatkul/:day')
    //     .get(FbpApi.rekapPerPertemuan);
    //
    // app.route('/rekapmahasiswa/:nrp/:kodeMatkul')
    //     .get(FbpApi.rekapMhsPerKuliah);
    //
    // app.route('/rekapmahasiswa/:nrp/:semester')
    //     .get(FbpApi.rekapMhsPerSemester);
    //
    app.route('/tambahmahasiswa')
        .post(FbpApi.tambahMahasiswa);
    //
    // app.route('/tambahpeserta/:kodeMatkul/:nrp')
    //     .post(FbpApi.tambahPeserta);
    //
    // app.route('/tambahmatkul')
    //     .post(FbpApi.tambahMatkul);
    //
    // app.route('/tambahjadwal')
    //     .post(FbpApi.tambahJadwal);
    //
    // app.route('/tambahdosen')
    //     .post(FbpApi.tambahDosen);
};
