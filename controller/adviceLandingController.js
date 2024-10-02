const connectDB = require('../db/db'); // database connection

const getAdviceLanding = async (req, res) => {
  try {
    const query = 'SELECT * FROM adviceLanding';
    const pool = await connectDB(); // Await connection to the pool

    const [results] = await pool.promise().query(query); // Use promise-based query

    if (results.length === 0) {
      return res.status(404).json({ error: "No advice found" });
    }

    console.log("Fetched advice:", results);
    res.status(200).json(results); // Respond with results
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAskAdviceCardData = async (req, res) => {
  try {
    const pool = await connectDB();
    if (pool) {
      pool.query('SELECT * FROM askAdviceCardData', (err, results) => {
        if (err) {
          console.error("Error fetching advice data:", err.message);
          return res.status(500).json({ error: 'Database query error' });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: 'No advice data found' });
        }
        res.status(200).json(results);
      });
    } else {
      res.status(500).json({ error: 'No database connection' });
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAdviceLanding, getAskAdviceCardData };
