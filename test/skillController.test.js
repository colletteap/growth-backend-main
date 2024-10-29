const connectDB = require('../db/db');
const request = require('supertest');
const app = require('../index');

let pool;
let token;

const deleteAllData = async (pool) => {
  await pool.query('DELETE FROM skillInfo');
  await pool.query('DELETE FROM skills');
  await pool.query('DELETE FROM skillsSearch');
};

const createTables = async (pool) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS skills (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `);
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS skillsSearch (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `);
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS skillInfo (
      id INT AUTO_INCREMENT PRIMARY KEY,
      skill VARCHAR(255) NOT NULL,
      details TEXT,
      userId VARCHAR(255) NOT NULL
    )
  `);
};

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  pool = await connectDB();
  console.log('Database connected:', pool);
  await createTables(pool);

  // Register and login a user to get a token for authenticated requests
  await request(app).post('/register').send({
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    username: 'testuser'
  });

  const loginRes = await request(app).post('/login').send({
    email: 'test@example.com',
    password: 'password123'
  });

  token = `Bearer ${loginRes.body.accessToken}`; 
});

beforeEach(async () => {
  if (pool) {
    await deleteAllData(pool);
  }
});

afterAll(async () => {
  if (pool) {
    await pool.query('DROP TABLE IF EXISTS skillInfo');
    await pool.query('DROP TABLE IF EXISTS skills');
    await pool.query('DROP TABLE IF EXISTS skillsSearch');
    await pool.end();
  }
});

describe('Skill Controller Endpoints', () => {

  describe('POST /skillInfo', () => {
    it('should add a new skill post', async () => {
      const res = await request(app)
        .post('/skillInfo')
        .set('Authorization', token)
        .send({ skill: 'JavaScript', details: 'Test Skill', userId: 'testUserId' });
      
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ message: "Skill post successful!" });
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/skillInfo')
        .set('Authorization', token)
        .send({ skill: 'JavaScript' });
        
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Missing required fields' });
    });
  });

  describe('GET /skills', () => {
    it('should retrieve all skills', async () => {
      await pool.query(`INSERT INTO skills (name) VALUES ('JavaScript')`);
      const res = await request(app)
        .get('/skills')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toHaveProperty('name', 'JavaScript');
    });

    it('should return 404 if no skills found', async () => {
      const res = await request(app)
        .get('/skills')
        .set('Authorization', token);
      
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'No skills found' });
    });
  });

  describe('GET /skillsSearch', () => {
    it('should retrieve all skills in search', async () => {
      await pool.query(`INSERT INTO skillsSearch (name) VALUES ('JavaScript')`);
      const res = await request(app)
        .get('/skillsSearch')
        .set('Authorization', token);
        
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toHaveProperty('name', 'JavaScript');
    });

    it('should return 404 if no skills found in search', async () => {
      const res = await request(app)
        .get('/skillsSearch')
        .set('Authorization', token);
      
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'No skills found' });
    });
  });

  describe('GET /skillInfo', () => {
    it('should retrieve specific skill information', async () => {
      await pool.query('INSERT INTO skillInfo (skill, details, userId) VALUES (?, ?, ?)', 
        ['JavaScript', 'Programming Language', 'testUserId']);
      const res = await request(app)
        .get('/skillInfo?skill=JavaScript')
        .set('Authorization', token);
        
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty('skill', 'JavaScript');
      expect(res.body[0]).toHaveProperty('details', 'Programming Language');
    });

    it('should return 404 if skill info not found', async () => {
      const res = await request(app)
        .get('/skillInfo?skill=Python')
        .set('Authorization', token);
        
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'No skills found' });
    });
  });

  describe('PUT /skillInfo/:id', () => {
    it('should update an existing skill post', async () => {
      const [{ insertId: skillId }] = await pool.query('INSERT INTO skillInfo (skill, details, userId) VALUES (?, ?, ?)', 
        ['JavaScript', 'Old Detail', 'testUserId']);
      const res = await request(app)
        .put(`/skillInfo/${skillId}`)
        .set('Authorization', token)
        .send({ details: 'Updated Detail', userId: 'testUserId' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Skill updated successfully' });
    });

    it('should return 403 if updating another user’s skill post', async () => {
      const [{ insertId: skillId }] = await pool.query('INSERT INTO skillInfo (skill, details, userId) VALUES (?, ?, ?)', 
        ['JavaScript', 'Old Detail', 'anotherUser']);
      const res = await request(app)
        .put(`/skillInfo/${skillId}`)
        .set('Authorization', token)
        .send({ details: 'Updated Detail', userId: 'testUserId' });

      expect(res.status).toBe(403);
      expect(res.body).toEqual({ error: 'Unauthorized: You can only update your own posts' });
    });
  });

  describe('DELETE /skillInfo/:id', () => {
    it('should delete an existing skill post', async () => {
      const [{ insertId: skillId }] = await pool.query('INSERT INTO skillInfo (skill, details, userId) VALUES (?, ?, ?)', 
      ['JavaScript', 'Detail to delete', 'testUserId']);
      const res = await request(app)
        .delete(`/skillInfo/${skillId}`)
        .set('Authorization', token)
        .send({ userId: 'testUserId' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Skill post deleted successfully' });
    });

    it('should return 403 if trying to delete another user’s skill post', async () => {
      const [{ insertId: skillId }] = await pool.query('INSERT INTO skillInfo (skill, details, userId) VALUES (?, ?, ?)', 
        ['JavaScript', 'Detail to delete', 'anotherUser']);
      const res = await request(app)
        .delete(`/skillInfo/${skillId}`)
        .set('Authorization', token)
        .send({ userId: 'testUserId' });

      expect(res.status).toBe(403);
      expect(res.body).toEqual({ error: 'Unauthorized: You can only delete your own posts' });
    });
  });
});
