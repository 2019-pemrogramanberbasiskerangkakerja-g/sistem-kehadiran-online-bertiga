'use strict';

var con = require('./conn');
var sqrl = require('squirrelly')

sqrl.definePartial("head", `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="bertiga">
  <title>Sistem Kehadiran Online</title>
  <!-- Bootstrap core CSS -->
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
`)

sqrl.definePartial("navbar", `
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <a class="navbar-brand" href="/">Sistem Kehadiran Online</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/tambahmahasiswa">Tambah Mahasiswa
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
`)

sqrl.definePartial("foot", `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
`)

exports.index = function(req, res) {
    res.render('index', {

    })
}

exports.tambahMahasiswa = function(req, res) {
    res.render('tambah_mhs', {

    })
}

exports.absen = function(req, res) {

}

exports.tambahPeserta = function(req, res) {

}

exports.tambahMatkul = function(req, res) {

}

exports.tambahJadwal = function(req, res) {

}

exports.tambahDosen = function(req,res) {

}

//rekap kuliah per semester
exports.rekapPerSemester = function(req, res) {

};

//rekap kuliah per pertemuan
exports.rekapPerPertemuan = function(req, res) {

};

//rekap mhs per kuliah
exports.rekapMhsPerKuliah = function(req, res) {

};

//rekap mhs per semester
exports.rekapMhsPerSemester = function(req, res) {

};
