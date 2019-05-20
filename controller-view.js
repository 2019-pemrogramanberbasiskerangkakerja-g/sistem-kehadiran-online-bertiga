'use strict';

var con = require('./conn');
var sqrl = require('squirrelly');
const request = require('request');

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
            <li class="nav-item">
              <a class="nav-link" href="/vtambahmahasiswa">
                Tambah Mahasiswa
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/vtambahpeserta">
                Tambah Peserta
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/vtambahmatkul">
                Tambah Matkul
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/vtambahjadwal">
                Tambah Jadwal
              </a>
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
    res.render('index')
}

exports.tambahMahasiswa = function(req, res) {
    res.render('tambah_mhs')
}

exports.tambahMahasiswaPost = function(req, res) {
    request.post('http://2d01b192.ngrok.io/tambahmahasiswa', {
        json: {
            nrp: req.body.nrp,
            nama: req.body.nama,
            password: req.body.password
        }
    }, (error, response, body) => {
        if(error) {
            console.error(error)
            return
        }
        console.log(response.body.status)

        res.render('tambah_mhs', {
            status: response.body.status,
            pesan: response.body.pesan
        });
    });
}

exports.tambahPeserta = function(req, res) {
    res.render('tambah_peserta');
}

exports.tambahPesertaPost = function(req, res) {
    request.post('http://2d01b192.ngrok.io/tambahpeserta', {
        json: {
            nrp: req.body.nrp,
            id_matkul: req.body.matakuliah_id,
        }
    }, (error, response, body) => {
        if(error) {
            console.error(error)
            return
        }

        res.render('tambah_peserta', {
            status: response.body.status,
            pesan: response.body.pesan,
        });
    });
}

exports.tambahMatkul = function(req, res) {
    res.render('tambah_matkul');
}

exports.tambahMatkulPost = function(req, res) {
    request.post('http://2d01b192.ngrok.io/tambahmatkul', {
        json: {
            nama: req.body.nama,
            semester: req.body.semester,
            kelas: req.body.kelas,
        }
    }, (error, response, body) => {
        if(error) {
            console.error(error)
            return
        }

        res.render('tambah_matkul', {
            status: response.body.status,
            pesan: response.body.pesan
        });
    });
}

exports.tambahJadwal = function(req, res) {
    res.render('tambah_jadwal');
}

exports.tambahJadwalPost = function(req, res) {
    request.post('http://2d01b192.ngrok.io/tambahjadwal', {
        json: {
            matakuliah_id: req.body.matakuliah_id,
            pertemuan: req.body.pertemuan,
            ruangan: req.body.ruangan,
            jam_mulai: req.body.jam_mulai,
            jam_selesai: req.body.jam_selesai,
        }
    }, (error, response, body) => {
        if(error) {
            console.error(error)
            return
        }

        res.render('tambah_jadwal', {
            status: response.body.status,
            pesan: response.body.pesan
        });
    });
}
