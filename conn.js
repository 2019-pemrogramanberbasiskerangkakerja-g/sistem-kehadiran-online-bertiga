const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = lowdb(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ matkuls: [], participants: [], mahasiswas: [], attendances: [], dosens: [],  meetings:[] })
    .write()

module.exports = db;
