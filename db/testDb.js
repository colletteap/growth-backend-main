const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  }
});

db.serialize(() => {
  // Create users table
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )`);

  //  test data
  const stmt = db.prepare(`INSERT INTO users (name, email) VALUES (?, ?)`);
  stmt.run('Alice', 'alice@example.com');
  stmt.run('Bob', 'bob@example.com');
  stmt.finalize();
});

module.exports = db;
