const connectDB = require('../db/db');
const request = require('supertest');
const app = require('../index');

let pool; // Define a global variable for the pool

const deleteAllData = async (pool) => {
  await pool.query('DELETE FROM users');
  // Add additional delete statements for other tables as needed
};

beforeAll(async () => {
  process.env.NODE_ENV = 'test'; // Set the environment to test
  pool = await connectDB(); // Connect to the database
  console.log('Database connected:', pool);
});

beforeEach(async () => {
  if (pool) {
    await deleteAllData(pool);
  }
});

afterAll(async () => {
  if (pool) {
    await pool.end(); // Close the pool connection
  }
});

describe('User Registration', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'testing@example.com',
        password: 'password456',
        firstName: 'Sally',
        username: 'sally123',
      });

    expect(res.status).toBe(201); 
  });
});
