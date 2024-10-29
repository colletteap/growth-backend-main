const connectDB = require('../db/db');
const request = require('supertest');
const app = require('../index');

let pool; 

const deleteAllData = async (pool) => {
  await pool.query('DELETE FROM users');
};

beforeAll(async () => {
  process.env.NODE_ENV = 'test'; // Set the environment to test
  pool = await connectDB(); 
  console.log('Database connected:', pool);
});

beforeEach(async () => {
  if (pool) {
    await deleteAllData(pool); // Clear test data
  }
});

afterAll(async () => {
  if (pool) {
    await pool.end(); 
  }
});

describe('Auth Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'testuser@example.com',
        password: 'securePassword123',
        firstName: 'Test',
        username: 'testuser',
      });

    expect(res.status).toBe(201);
  });

  it('should authenticate an existing user', async () => {
    await request(app)
      .post('/register')
      .send({
        email: 'loginuser@example.com',
        password: 'loginPassword123',
        firstName: 'Login',
        username: 'loginuser',
      });

    const res = await request(app)
      .post('/login')
      .send({
        email: 'loginuser@example.com',
        password: 'loginPassword123',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken'); 
    expect(res.body).toHaveProperty('refreshToken'); 
  });
});
