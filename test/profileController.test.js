const connectDB = require('../db/db');
const request = require('supertest');
const app = require('../index');

let pool;
let token;

const deleteAllData = async (pool) => {
  await pool.query('DELETE FROM users');
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
};

// Seed initial data for tests
const seedData = async (pool) => {
  await pool.query(`
    INSERT INTO users (userId, email, password, firstName, username)
    VALUES ('testUserId','test@example.com', 'password123', 'Test', 'testuser')
  `);
};

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  pool = await connectDB();
  console.log('Database connected:', pool);
  await createTables(pool); // Ensure tables are created

  await request(app)
  .post('/register')
  .send({
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    username: 'testuser',
  });

const loginRes = await request(app)
  .post('/login')
  .send({
    email: 'test@example.com',
    password: 'password123',
  });

token = `Bearer ${loginRes.body.accessToken}`; // Store the token for use in tests
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
   describe('GET /profile', () => {
    it('should retrieve user profile data', async () => {
      const res = await request(app)
        .get('/profile')
        .set('Authorization', token);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('email', 'test@example.com');
      expect(res.body).toHaveProperty('firstName', 'Test');
    });
  });

  describe('PUT /profile', () => {
    it('should update the user profile', async () => {
      const res = await request(app)
        .put('/profile')
        .set('Authorization', token)
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
      await pool.query('DELETE FROM users WHERE email = ?', ['test@example.com']);

      const res = await request(app)
        .put('/profile')
        .set('Authorization', token)
        .send({
          title: 'New Title',
        });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'User not found' });
    });
  });
});
