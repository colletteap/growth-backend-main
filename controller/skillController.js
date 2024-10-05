const connectDB = require('../db/db'); // Updated DB connection file
const {  insertRecord, checkRecordExists, getRecord, getAllRecords
} = require("../utils/sqlFunctions");

const getSkills = async (req, res) => {
  try {
    const pool = await connectDB(); // Await the connection pool

    if (pool) {
      pool.query('SELECT * FROM skills', (err, results) => {
        if (err) {
          console.error("Error fetching skills:", err.message);
          return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "No skills found" });
        }

        res.status(200).json(results);
      });
    } else {
      res.status(500).json({ error: 'No database connection' });
    }
  } catch (error) {
    console.error("Error during database connection:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const skillSearch = async (req, res) => {
  try {
    const pool = await connectDB(); // Await the connection pool

    if (pool) {
      pool.query('SELECT * FROM skillsSearch', (err, results) => {
        if (err) {
          console.error("Error fetching skills:", err.message);
          return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "No skills found" });
        }

        res.status(200).json(results);
      });
    } else {
      res.status(500).json({ error: 'No database connection' });
    }
  } catch (error) {
    console.error("Error during database connection:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const skillInfo = async (req, res) => {
  const { skill } = req.query;

  if (!skill) {
    return res.status(400).json({ error: 'Skill query parameter is missing' });
  }

  try {
    const records = await getAllRecords('skillInfo', 'skill', skill); // Fetch all matching records

    if (records.length === 0) {
      return res.status(404).json({ error: 'No skills found' });
    }

    res.status(200).json(records); // Return all matching records as an array
  } catch (error) {
    console.error('Error fetching skill info:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Add a new skill post (storing in details field and logging userId)
const addSkillPost = async (req, res) => {
  console.log(req.body);
  const { skill, details, userId } = req.body;

  if (!skill || !details || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // const pool = await connectDB();
    // pool.query(
    //   `INSERT INTO ${skillInfo} SET ?`,
    //   [skill, details, userId],
    //   (err, results) => {
    //     if (err) {
    //       console.error('Error adding skill post:', err.message);
    //       return res.status(500).json({ error: 'Database query error' });
    //     }
    //     res.status(201).json({ message: 'Skill post added successfully' });
    //   }
    // );
    await insertRecord('skillInfo', req.body);
    res.status(201).json({ message: "Skill post successful!" });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getSkills, skillSearch, skillInfo, addSkillPost };
