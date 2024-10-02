const connectDB = require('../db/db'); // database connection

const getBlogLanding = async (req, res) => {
  try {
    const query = 'SELECT * FROM blogLanding';
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

const getBlogPageData = async (req, res) => {
    try {
      const pool = await connectDB();
      if (pool) {
        pool.query('SELECT * FROM blogPageData', (err, results) => {
          if (err) {
            console.error('Error fetching blog data:', err.message);
            return res.status(500).json({ error: 'Database query error' });
          }
          res.status(200).json(results);
        });
      } else {
        res.status(500).json({ error: 'No database connection' });
      }
    } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const getUrls = async (req, res) => {
    try {
      const pool = await connectDB();
      if (pool) {
        pool.query('SELECT * FROM urls', (err, results) => {
          if (err) {
            console.error('Error fetching URLs:', err.message);
            return res.status(500).json({ error: 'Database query error' });
          }
          res.status(200).json(results);
        });
      } else {
        res.status(500).json({ error: 'No database connection' });
      }
    } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = { getBlogLanding, getBlogPageData, getUrls };
