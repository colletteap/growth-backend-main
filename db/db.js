const mysql = require('mysql2');
const config = require('./config');

const connectDB = () => {
  return new Promise((resolve, reject) => {
    const pool = mysql.createPool({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST : process.env.DATABASE, // Add this line to select the database
      charset: 'utf8mb4', 
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Database connection failed:", err.message);
        reject(err);
      } else {
        console.log("Connected to MySQL database");
        connection.release();
        resolve(pool);
      }
    });
  });
};

module.exports = connectDB;
