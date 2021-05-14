const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

let db_path;

console.log(`Working on ${process.env.NODE_ENV.toUpperCase()} environment`);

switch (process.env.NODE_ENV.toUpperCase()) {
    case 'DEVELOPMENT':
        db_path = './database/dev.db.json';
        break;
    case 'TEST':
        db_path = './database/test.db.json';
        break;
    case 'PRODUCTION':
        db_path = './database/db.json';
        break;
}

const adapter = new FileSync(db_path);
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ items: [], lists: [] }).write();

module.exports = db;
