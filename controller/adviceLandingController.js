const { connectDB } = require('../db/db'); // database connection

const getAdviceLanding = async (req, res) => {
  try {
    const query = 'SELECT * FROM adviceLanding';
    const pool = await connectDB(); // Await connection to the pool

    const [results] = await pool.query(query); // Use async/await instead of callback

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

module.exports = { getAdviceLanding };
