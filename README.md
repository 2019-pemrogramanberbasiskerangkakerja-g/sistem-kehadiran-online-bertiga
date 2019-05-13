## Framework Based Programming
### Online attendance system API with Node.js, Express.js, & LowDB

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

#### Serve:
- absen
    - POST /absen/RUANG/NRP


- rekap kuliah per semester
    - GET /rekap/IDMATAKULIAH


- rekap kuliah per pertemuan
    - GET /rekap/IDMATAKULIAH/PERTEMUANKE


- rekap per mahasiswa per kuliah
    - GET /rekapmahasiswa/NRP/IDMATAKULIAH


- rekap per mahasiswa per semester
    - GET /rekapmahasiswa/NRP/IDSEMESTER


- tambah user mhs baru
    - POST /tambahmahasiswa
    - sent via body: nrp, nama, password


- tambah user mhs ke mata kuliah
    - POST /tambahpeserta/IDMATAKULIAH/NRP


- tambah mata kuliah baru
    - POST /tambahmatkul
    - sent via body: id mata kuliah, nama matakuliah, kelas


- tambah jadwal pertemuan untuk kuliah
    - POST /tambahjadwal
    - sent via body: id mata kuliah, pertemuan ke, ruang, jam masuk, jam selesai
