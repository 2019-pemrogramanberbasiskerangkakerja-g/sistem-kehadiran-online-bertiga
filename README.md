## Framework Based Programming
### Online attendance system API with Node.js, Express.js, & MySql

#### Member:
- Nirmala - 05111540007003
- Ariiq Firanda N - 05111640000083
- Faizal Khilmi Muzakki - 05111640000120

#### Explaining:
- `controller.js`: ur function CRUD to database
- `routes.js` : ur routing
- `conn.js` : database connection configuration
- `res.js` : ur json response formatting

#### Usage:
- `npm install`
- `node database/create_table.js`
- `node server.js`

### Database Schema:
  ![Database](IMG/Database.PNG)
  <br>

#### API and Example (Using Postman):
- absen
    - POST /absen/:RUANG/:NRP

    ![absen](IMG/absen.PNG)
    <br>
 
- rekap kuliah per semester
    - GET /rekap/:IDMATAKULIAH

    ![rekapsem](IMG/rekapsem.PNG)
    <br>

- rekap kuliah per pertemuan
    - GET /rekap/:IDMATAKULIAH/:PERTEMUANKE

    ![rekappertem](IMG/rekappertem.PNG)
    <br>

- rekap per mahasiswa per kuliah
    - GET /rekapmahasiswa/:NRP/:IDMATAKULIAH
    
    ![rekapmhs](IMG/rekapmhs.PNG)
    <br>

- rekap per mahasiswa per semester
    - GET /rekapmahasiswa/:NRP/:IDSEMESTER

    ![rekapmhssem](IMG/rekapmhssem.PNG)
    <br>

- tambah user mhs baru
    - POST /tambahmahasiswa
    - sent via body: nrp, name, password

    ![tambahmahasiswa](IMG/tambahmahasiswa.PNG)
    <br>

- tambah user mhs ke mata kuliah
    - POST /tambahpeserta/:IDMATAKULIAH/:NRP

    ![tambahpeserta](IMG/tambahpeserta.PNG)
    <br>

- tambah mata kuliah baru
    - POST /tambahmatkul
    - sent via body: kodeMatkul, name, kelas, semester

    ![tambahmatkul](IMG/tambahmatkul.PNG)
    <br>

- tambah jadwal pertemuan untuk kuliah
    - POST /tambahjadwal
    - sent via body: kodeMatkul, pertemuan, ruang, jam masuk, jam selesai
    
    ![tambahjadwal](IMG/tambahjadwal.PNG)
    <br>

## Dokumentasi View menggunakan Api Kelompok 5

- Tampilan Awal Sistem Kehadiran Online

![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(82).png)

- Tambah Mahasiswa baru
  - Post /vtambahmahasiswa
  - sent via body : NRP, Nama, Password
  - cek mahasiswa yang telah ditambahkan http://7840b93e.ngrok.io/mahasiswa
  
  ![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(91).png)
  
- Tambah Mata Kuliah 
  - Post /vtambahmatkul
  - sent via body : Mata Kuliah ID, Nama, Semester, Kelas
  - cek mahasiswa yang telah ditambahkan http://7840b93e.ngrok.io/matakuliah
  
  ![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(92).png)

- Tambah Peserta ke mata kuliah
  - Post /vtambahpeserta
  - sent via body : NRP, Mata Kuliah ID
  
  ![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(93).png)
  
- Tambah Jadwal Pertemuan untuk Mata Kuliah  
  - Post /vtambahjadwal
  - sent via body : ID Matkul, Pertemuan, Ruangan, Jam Mulai, Jam Selesai
  
  ![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(94).png)
  
- Absen
  - Post /vabsen
  - sent via body : NRP, Ruangan
  
  ![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(95).png)

- Rekap Semester
  - Get /vrekapsemester

  ![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(96).png)

- Rekap Pertemuan
  - Get /vrekappertemuan
  
  ![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(102).png)

  - Setelah disubmit maka akan muncul rekap pertemuan dari ID mata kuliah dan pertemuan yang telah kita masukkan
  ![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(97).png)

- Rekap Matakuliah Mahasiswa
  - Get /vrekapmahasiswa
  ![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(99).png)

  - maka akan tampil rekap dari nrp dan Id mata kuliah tersebut
  ![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(98).png)

- Rekap Semester Mahasiswa
  - Get /vrekapmahasiswasem
  ![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(101).png)

  - Maka akan tampil rekap seperti berikut
  ![IMG](https://github.com/2019-pemrogramanberbasiskerangkakerja-g/sistem-kehadiran-online-bertiga/blob/baru/IMG/Screenshot%20(100).png)
