'use strict';

module.exports = function(app) {
    var FbpApi = require('./controller');

    app.route('/absen/:ruang/:nrp')
        .post(FbpApi.absen);

    app.route('/tambahmahasiswa')
        .post(FbpApi.tambahMahasiswa);

    app.route('/tambahpeserta/:kodeMatkul/:nrp')
        .post(FbpApi.tambahPeserta);

    app.route('/tambahmatkul')
        .post(FbpApi.tambahMatkul);
};
