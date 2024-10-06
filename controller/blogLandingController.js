const connectDB = require('../db/db'); // database connection

const getBlogLanding = async (req, res) => {
  try {
    const records = await getAllRecords('blogLanding'); 
    if (records.length === 0) {
      return res.status(404).json({ error: 'No blogs found' });
    }
    res.status(200).json(records); 
  } catch (error) {
    console.error('Error fetching all blogs:', error.message);
    res.status(500).json({ error: 'Internal server error' });
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
