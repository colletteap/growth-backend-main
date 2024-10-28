const mysql = require('mysql2');
const config = require('./config');

const connectDB = () => {
  const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST : process.env.DATABASE,
    charset: 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  return pool.promise(); // Return the promise-based pool
};

module.exports = connectDB;
