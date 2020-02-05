const sqlite3 = require('sqlite3').verbose();
// module.exports = new sqlite3.Database(':memory:');
let db = null;

if(process.env.NODE_ENV === 'test'){
    db = new sqlite3.Database(':memory:')
}else{
    db = new sqlite3.Database('./sample.db')
}

module.exports = db;