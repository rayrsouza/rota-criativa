const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(':memory:');

const initSQL = `
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  birthdate TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  gender TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

db.serialize(() => {
  db.run(initSQL);
});

module.exports = db;
