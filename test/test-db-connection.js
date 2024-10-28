const connectDB = require('../db/db'); // Adjust the path if necessary

(async () => {
  try {
    const pool = await connectDB();
    console.log('Database connected successfully');
    await pool.end(); // Close the connection pool after testing
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();
