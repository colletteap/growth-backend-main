const { connectDB } = require('../db/db'); // database connection

const getSkills = async (req, res) => {
  try {
    const query = 'SELECT * FROM skills';
    const pool = await connectDB(); // Await connection to the pool

    pool.query(query, (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "No skills found" });
      }

      console.log("Fetched skills:", results);
      res.status(200).json(results); // Respond with results
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSkills };
