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

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  pool = await connectDB();
  console.log('Database connected:', pool);
});

beforeEach(async () => {
  if (pool) {
    await deleteAllData(pool);
    // Register a user before each test
    await request(app)
      .post('/register')
      .send({
        email: 'profileuser@example.com',
        password: 'profilePassword123',
        firstName: 'ProfileUser',
        username: 'profileuser',
      });
  }
});

afterAll(async () => {
  if (pool) {
    await pool.end();
  }
});

describe('Profile Controller Endpoints', () => {
  describe('GET /profile', () => {
    it('should retrieve user profile data', async () => {
      const loginRes = await request(app)
        .post('/login')
        .send({
          email: 'profileuser@example.com',
          password: 'profilePassword123',
        });

      const accessToken = loginRes.body.accessToken;

      const res = await request(app)
        .get('/profile')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('email', 'profileuser@example.com');
      expect(res.body).toHaveProperty('firstName', 'ProfileUser');
    });
  });

  describe('PUT /profile', () => {
    it('should update the user profile', async () => {
      const loginRes = await request(app)
        .post('/login')
        .send({
          email: 'profileuser@example.com',
          password: 'profilePassword123',
        });

      const accessToken = loginRes.body.accessToken;

      const res = await request(app)
        .put('/profile')
        .set('Authorization', `Bearer ${accessToken}`)
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
      const loginRes = await request(app)
        .post('/login')
        .send({
          email: 'profileuser@example.com',
          password: 'profilePassword123',
        });

      const accessToken = loginRes.body.accessToken;

      // Delete the user to simulate a missing user
      await pool.query('DELETE FROM users WHERE email = ?', ['profileuser@example.com']);

      const res = await request(app)
        .put('/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 'New Title',
        });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'User not found' });
    });
  });
});
