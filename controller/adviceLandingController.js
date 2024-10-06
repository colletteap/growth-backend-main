const connectDB = require('../db/db'); // database connection
const {  insertRecord, checkRecordExists, getRecord, getAllRecords
} = require("../utils/sqlFunctions");

const getAdviceLanding = async (req, res) => {
  try {
    const records = await getAllRecords('adviceLanding'); 
    if (records.length === 0) {
      return res.status(404).json({ error: 'No advice found' });
    }
    res.status(200).json(records); 
  } catch (error) {
    console.error('Error fetching all advice:', error.message);
    res.status(500).json({ error: 'Internal server error' });
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
