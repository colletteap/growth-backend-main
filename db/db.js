const mysql = require('mysql2'); // Use mysql2
const config = require('./config');
const Sequelize = require('sequelize'); // For testing with Sequelize

const connectDB = () => {
  // Only connect to MySQL in development and production
  if (process.env.NODE_ENV !== 'test') {
    return new Promise((resolve, reject) => {
      const pool = mysql.createPool(config[process.env.NODE_ENV]);

      pool.getConnection((err, connection) => {
        if (err) {
          console.error("Database connection failed:", err.message);
          reject(err); // Reject the promise with the error
        } else {
          console.log("Connected to MySQL database");
          connection.release(); // Release the connection back to the pool
          resolve(pool); // Resolve the promise with the connection pool
        }
      });
    });
  } else {
    // For test environment, use SQLite (handled by Sequelize)
    console.log('Running tests with SQLite in-memory database');
    return Promise.resolve(); // No MySQL connection during tests
  }
};

module.exports = connectDB;
