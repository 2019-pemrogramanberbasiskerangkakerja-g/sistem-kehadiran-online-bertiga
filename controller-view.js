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
  <!-- Extra CSS -->
  <style>
        /*//////////////////////////////////////////////////////////////////
        [ FONT ]*/


        @font-face {
        font-family: OpenSans-Regular;
        src: url('../fonts/OpenSans/OpenSans-Regular.ttf'); 
        }



        /*//////////////////////////////////////////////////////////////////
        [ RESTYLE TAG ]*/
        * {
            margin: 0px; 
            padding: 0px; 
            box-sizing: border-box;
        }

        body, html {
            height: 100%;
            font-family: sans-serif;
        }

        /* ------------------------------------ */
        a {
            margin: 0px;
            transition: all 0.4s;
            -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        }

        a:focus {
            outline: none !important;
        }

        a:hover {
            text-decoration: none;
        }

        /* ------------------------------------ */
        h1,h2,h3,h4,h5,h6 {margin: 0px;}

        p {margin: 0px;}

        ul, li {
            margin: 0px;
            list-style-type: none;
        }


        /* ------------------------------------ */
        input {
        display: block;
            outline: none;
            border: none !important;
        }

        textarea {
        display: block;
        outline: none;
        }

        textarea:focus, input:focus {
        border-color: transparent !important;
        }

        /* ------------------------------------ */
        button {
            outline: none !important;
            border: none;
            background: transparent;
        }

        button:hover {
            cursor: pointer;
        }

        iframe {
            border: none !important;
        }




        /*//////////////////////////////////////////////////////////////////
        [ Utiliti ]*/






        /*//////////////////////////////////////////////////////////////////
        [ Table ]*/

        .limiter {
        width: 100%;
        margin: 0 auto;
        }

        .container-table100 {
        width: 100%;
        min-height: 100vh;
        background: #c850c0;
        background: -webkit-linear-gradient(45deg, #4158d0, #c850c0);
        background: -o-linear-gradient(45deg, #4158d0, #c850c0);
        background: -moz-linear-gradient(45deg, #4158d0, #c850c0);
        background: linear-gradient(45deg, #4158d0, #c850c0);

        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 33px 30px;
        }

        .wrap-table100 {
        width: 1170px;
        }

        table {
        border-spacing: 1;
        border-collapse: collapse;
        background: white;
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
        margin: 0 auto;
        position: relative;
        }
        table * {
        position: relative;
        }
        table td, table th {
        padding-left: 8px;
        }
        table thead tr {
        height: 60px;
        background: #36304a;
        }
        table tbody tr {
        height: 50px;
        }
        table tbody tr:last-child {
        border: 0;
        }
        table td, table th {
        text-align: left;
        }
        table td.l, table th.l {
        text-align: right;
        }
        table td.c, table th.c {
        text-align: center;
        }
        table td.r, table th.r {
        text-align: center;
        }


        .table100-head th{
        font-family: OpenSans-Regular;
        font-size: 18px;
        color: #fff;
        line-height: 1.2;
        font-weight: unset;
        }

        tbody tr:nth-child(even) {
        background-color: #f5f5f5;
        }

        tbody tr {
        font-family: OpenSans-Regular;
        font-size: 15px;
        color: #808080;
        line-height: 1.2;
        font-weight: unset;
        }

        tbody tr:hover {
        color: #555555;
        background-color: #f5f5f5;
        cursor: pointer;
        }

        .column1 {
        width: 260px;
        padding-left: 40px;
        }

        .column2 {
        width: 160px;
        }

        .column3 {
        width: 245px;
        }

        .column4 {
        width: 110px;
        text-align: right;
        }

        .column5 {
        width: 170px;
        text-align: right;
        }

        .column6 {
        width: 222px;
        text-align: right;
        padding-right: 62px;
        }


        @media screen and (max-width: 992px) {
        table {
            display: block;
        }
        table > *, table tr, table td, table th {
            display: block;
        }
        table thead {
            display: none;
        }
        table tbody tr {
            height: auto;
            padding: 37px 0;
        }
        table tbody tr td {
            padding-left: 40% !important;
            margin-bottom: 24px;
        }
        table tbody tr td:last-child {
            margin-bottom: 0;
        }
        table tbody tr td:before {
            font-family: OpenSans-Regular;
            font-size: 14px;
            color: #999999;
            line-height: 1.2;
            font-weight: unset;
            position: absolute;
            width: 40%;
            left: 30px;
            top: 0;
        }
        table tbody tr td:nth-child(1):before {
            content: "Date";
        }
        table tbody tr td:nth-child(2):before {
            content: "Order ID";
        }
        table tbody tr td:nth-child(3):before {
            content: "Name";
        }
        table tbody tr td:nth-child(4):before {
            content: "Price";
        }
        table tbody tr td:nth-child(5):before {
            content: "Quantity";
        }
        table tbody tr td:nth-child(6):before {
            content: "Total";
        }

        .column4,
        .column5,
        .column6 {
            text-align: left;
        }

        .column4,
        .column5,
        .column6,
        .column1,
        .column2,
        .column3 {
            width: 100%;
        }

        tbody tr {
            font-size: 14px;
        }
        }

        @media (max-width: 576px) {
        .container-table100 {
            padding-left: 15px;
            padding-right: 15px;
        }
        }
    </style>
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
    request.post('http://1729da82.ngrok.io/tambahmahasiswa', {
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
    request.post('http://1729da82.ngrok.io/tambahpeserta', {
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
    request.post('http://1729da82.ngrok.io/tambahmatkul', {
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
    request.post('http://1729da82.ngrok.io/tambahjadwal', {
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

exports.rekapsemester = function(req, res) {
    res.render('form_rekapsemester');
}

exports.rekapsemesterGet = function(req, res) {
    request.get('http://1729da82.ngrok.io/rekap/'+req.params.id_matkul, (error, response, body) => {
        if(error) {
            console.error(error)
            return
        }

        console.log(body)
        //var result = []

        res.render('rekapsemester', {
            status: response.body.status,
            pesan: response.body.pesan,
            isi_data: response.body.isi_data
        });
    });
}

exports.rekappertemuan = function(req, res) {
    res.render('form_rekappertemuan');
}

exports.rekappertemuanGet = function(req, res) {
    request.get('http://1729da82.ngrok.io/rekap/'+req.params.id_matkul+'/'+req.params.pertemuanke, {
    }, (error, response, body) => {
        if(error) {
            console.error(error)
            return
        }

        console.log(body)

        res.render('rekappertemuan', {
            status: response.body.status,
            pesan: response.body.pesan,
            isi_data : response.body.isi_data
        });
    });
}

exports.rekapmhs = function(req, res) {
    res.render('form_rekapmhs');
}

exports.rekapmhsGet = function(req, res) {
    request.get('http://1729da82.ngrok.io/rekapmahasiswa/'+req.params.nrp+'/'+req.params.id_matkul, {
    }, (error, response, body) => {
        if(error) {
            console.error(error)
            return
        }

        //console.log(response.body)

        res.render('rekapmhs', {
            status: response.body.status,
            pesan: response.body.pesan,
            isi_data : response.body.isi_data
        });
    });
}

exports.rekapmhssem = function(req, res) {
    res.render('form_rekapmhssem');
}

exports.rekapmhssemGet = function(req, res) {
    request.get('http://1729da82.ngrok.io/rekapmahasiswasemester/'+req.params.nrp+'/'+req.params.idsemester, {
    }, (error, response, body) => {
        if(error) {
            console.error(error)
            return
        }

        //console.log(response.body)

        res.render('rekapmhssem', {
            status: response.body.status,
            pesan: response.body.pesan,
            isi_data : response.body.isi_data
        });
    });
}