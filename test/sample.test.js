const sequelize = require('../db/sequelize');
const request = require('supertest'); 
const app = require('../index');
const User = require('../schemas/userSchema'); // Import userschema

describe('User Registration', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true }); // Sync tables before each test
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
    expect(res.status).toBe(201);

    const user = await User.findOne({ where: { email: 'testing@example.com' } });
    expect(user).toBeTruthy();
    expect(user.username).toBe('sally123');
  });
});
