const { connectDB } = require('../db/db'); 
const request = require('supertest');
const app = require('../index');
const User = require('../schemas/userSchema');

describe('User Registration', () => {
let sequelize;

beforeAll(async () => {
  sequelize = await connectDB(); // Connect to the database
  console.log('Sequelize instance:', sequelize); 
});

afterAll(async () => {
  await sequelize.close(); 
});

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: 'testing@example.com',
        password: 'password456',
        firstName: 'Sally',
        username: 'sally123',
      });

    console.log('Response body:', res.body); 
    expect(res.status).toBe(201); // Check for successful response

    const user = await User.findOne({ where: { email: 'testing@example.com' } });
    expect(user).toBeTruthy(); // Ensure user was created
    expect(user.username).toBe('sally123'); // Validate username
  });
});
