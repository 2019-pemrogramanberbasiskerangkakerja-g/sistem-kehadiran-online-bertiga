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

[ss]

- Tambah Mahasiswa baru
  - Post /vtambahmahasiswa
  - body : NRP, Nama, Password
  
  [ss]
  
- Tambah Mata Kuliah 
  - Post /vtambahmatkul
  - body : Mata Kuliah ID, Nama, Semester, Kelas
  
 [ss]

- Tambah Peserta ke mata kuliah
  - Post /vtambahpeserta
  - body : NRP, Mata Kuliah ID
  
  [ss]
  
- Tambah Jadwal Pertemuan untuk Mata Kuliah  
  - Post /vtambahjadwal
  - body : ID Matkul, Pertemuan, Ruangan, Jam Mulai, Jam Selesai
  
  [ss]
  
- Absen
  - Post /vabsen
  - body : NRP, Ruangan
  
  [ss]

- Rekap Semester

- Rekap Pertemuan

- Rekap Matakuliah Mahasiswa

- Rekap Semester Mahasiswa

  





