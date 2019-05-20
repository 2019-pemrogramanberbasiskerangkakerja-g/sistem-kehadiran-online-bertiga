'use strict';

module.exports = function(app) {
    var FbpApi = require('./controller');
    var FbpView = require('./controller-view');

    app.route('/absen/:ruang/:nrp')
        .post(FbpApi.absen);

    app.route('/rekap/:kodeMatkul')
        .get(FbpApi.rekapPerSemester);

    app.route('/rekap/:kodeMatkul/:day')
        .get(FbpApi.rekapPerPertemuan);

    app.route('/rekapmahasiswa/:nrp/:kodeMatkul')
        .get(FbpApi.rekapMhsPerKuliah);

    app.route('/rekapmahasiswasem/:nrp/:semester')
        .get(FbpApi.rekapMhsPerSemester);

    app.route('/tambahmahasiswa')
        .post(FbpApi.tambahMahasiswa);

    app.route('/tambahpeserta/:kodeMatkul/:nrp')
        .post(FbpApi.tambahPeserta);

    app.route('/tambahmatkul')
        .post(FbpApi.tambahMatkul);

    app.route('/tambahjadwal')
        .post(FbpApi.tambahJadwal);

    app.route('/tambahdosen')
        .post(FbpApi.tambahDosen);

    // view
    app.route('/')
        .get(FbpView.index)

    app.route('/tambahmahasiswa')
        .get(FbpView.tambahMahasiswa)

    app.route('/tambahmahasiswaPost')
        .post(FbpView.tambahMahasiswaPost)

    app.route('/tambahpeserta')
        .get(FbpView.tambahPeserta)

    app.route('/tambahpesertaPost')
        .post(FbpView.tambahPesertaPost)

    app.route('/tambahmatkul')
        .get(FbpView.tambahMatkul)

    app.route('/tambahmatkulPost')
        .post(FbpView.tambahMatkulPost)
};
