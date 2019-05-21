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

    app.route('/vtambahmahasiswa')
        .get(FbpView.tambahMahasiswa)

    app.route('/vtambahmahasiswaPost')
        .post(FbpView.tambahMahasiswaPost)

    app.route('/vtambahpeserta')
        .get(FbpView.tambahPeserta)

    app.route('/vtambahpesertaPost')
        .post(FbpView.tambahPesertaPost)

    app.route('/vtambahmatkul')
        .get(FbpView.tambahMatkul)

    app.route('/vtambahmatkulPost')
        .post(FbpView.tambahMatkulPost)

    app.route('/vtambahjadwal')
        .get(FbpView.tambahJadwal)

    app.route('/vtambahjadwalPost')
        .post(FbpView.tambahJadwalPost)
    
    app.route('/vrekapsemester')
        .get(FbpView.rekapsemester)
    
    app.route('/vrekapsemesterget/:id_matkul')
        .get(FbpView.rekapsemesterGet)
    
    app.route('/vrekappertemuan')
        .get(FbpView.rekappertemuan)

    app.route('/vrekappertemuanget/:id_matkul/:pertemuanke')
        .get(FbpView.rekappertemuanGet)
    
    app.route('/vrekapmahasiswa')
        .get(FbpView.rekapmhs)

    app.route('/vrekapmahasiswaget/:nrp/:id_matkul')
        .get(FbpView.rekapmhsGet)

    app.route('/vrekapmahasiswasem')
        .get(FbpView.rekapmhssem)

    app.route('/vrekapmahasiswasemget/:nrp/:idsemester')
        .get(FbpView.rekapmhssemGet)
};
