const connectDB = require('../db/db'); // Updated DB connection file

const getSkills = async (req, res) => {
  try {
    const pool = await connectDB(); // Await the connection pool

    if (pool) {
      // Perform MySQL query only if the connection pool exists
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


module.exports = { getSkills };
