const db = require('../db/db');

const getSkills = (req, res) => {
  const query = 'SELECT * FROM skills';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const addSkill = (req, res) => {
    const { skill, details, userId } = req.body; // Data needs to come from frontend
  
    if (!skill || !details || !userId) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = 'INSERT INTO skills (skill, details, userId) VALUES (?, ?, ?)';
    db.query(query, [skill, details, userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Skill added successfully', skillId: result.insertId });
    });
  };
  
  module.exports = { getSkills, addSkill };
