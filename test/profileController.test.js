const connectDB = require('../db/db');
const request = require('supertest');
const app = require('../index');

let pool;

const deleteAllData = async (pool) => {
  await pool.query('DELETE FROM users');
  await pool.query('DELETE FROM skillinfo');
  await pool.query('DELETE FROM askadvicecarddata');
  await pool.query('DELETE FROM comments');
};

// Create missing tables if they don't exist
const createTables = async (pool) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(255) NOT NULL, 
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      firstName VARCHAR(255),
      username VARCHAR(255)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS skillinfo (
      id INT AUTO_INCREMENT PRIMARY KEY,
      skill VARCHAR(255) NOT NULL,
      details TEXT,
      userId VARCHAR(255) NOT NULL
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS askadvicecarddata (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question TEXT NOT NULL,
      userId VARCHAR(255)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      comment TEXT NOT NULL,
      userId VARCHAR(255),
      cardId INT
    )
  `);
};

// Seed initial data for tests
const seedData = async (pool) => {
  await pool.query(`
    INSERT INTO users (userId, email, password, firstName, username)
    VALUES (1,'profileuser@example.com', 'hashedPassword123', 'ProfileUser', 'profileuser')
  `);

  await pool.query(`
    INSERT INTO skillinfo (skill, details, userId)
    VALUES ('JavaScript', 'Test Skill', 1)
  `);
};

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  pool = await connectDB();
  console.log('Database connected:', pool);
  await createTables(pool); // Ensure tables are created
});

beforeEach(async () => {
  if (pool) {
    await deleteAllData(pool); // Clear the tables
    await seedData(pool); // Seed the tables with initial data
  }
});

afterAll(async () => {
  if (pool) {
    await pool.end(); // Close the database connection
  }
});

describe('Profile Controller Endpoints', () => {
  const fakeToken = 'fakeToken'; // Use the mock token directly

  describe('GET /profile', () => {
    it('should retrieve user profile data', async () => {
      const res = await request(app)
        .get('/profile')
        .set('Authorization', `Bearer ${fakeToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('email', 'profileuser@example.com');
      expect(res.body).toHaveProperty('firstName', 'ProfileUser');
    });
  });

  describe('PUT /profile', () => {
    it('should update the user profile', async () => {
      const res = await request(app)
        .put('/profile')
        .set('Authorization', `Bearer ${fakeToken}`)
        .send({
          title: 'New Title',
          bio: 'Updated Bio',
          yearsExperience: '6',
          education: 'Updated University',
          contactInfo: '987-654-3210',
          favBooks: 'Updated Book',
        });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Profile Updated Successfully' });
    });

    it('should return 404 if user is not found', async () => {
      // Delete the user to simulate a missing user
      await pool.query('DELETE FROM users WHERE email = ?', ['profileuser@example.com']);

      const res = await request(app)
        .put('/profile')
        .set('Authorization', `Bearer ${fakeToken}`)
        .send({
          title: 'New Title',
        });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'User not found' });
    });
  });
});
