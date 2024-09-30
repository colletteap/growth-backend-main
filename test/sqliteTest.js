const db = require('../db/testDb'); // Import the in-memory database

describe('User Model Tests', () => {
  beforeAll((done) => {
    // Optional: You can perform additional setup here if needed
    done();
  });

  afterAll((done) => {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      }
      done();
    });
  });

  test('Should retrieve user data', (done) => {
    db.get('SELECT * FROM users WHERE name = ?', ['Alice'], (err, row) => {
      if (err) {
        return done(err);
      }
      expect(row.name).toBe('Alice');
      expect(row.email).toBe('alice@example.com');
      done();
    });
  });

  test('Should insert a new user', (done) => {
    db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, ['Charlie', 'charlie@example.com'], function(err) {
      if (err) {
        return done(err);
      }

      // Verify the insertion
      db.get('SELECT * FROM users WHERE name = ?', ['Charlie'], (err, row) => {
        if (err) {
          return done(err);
        }
        expect(row.name).toBe('Charlie');
        expect(row.email).toBe('charlie@example.com');
        done();
      });
    });
  });
});
