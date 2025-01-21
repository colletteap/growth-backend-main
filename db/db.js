const mysql = require('mysql2');
const config = require('./config');

const connectDB = async() => {
  const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST : process.env.DATABASE,
    port: process.env.PORT || 3306,
    charset: 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  const promisePool = pool.promise();

  try {
    const [rows] = await promisePool.query('SELECT 1');
    console.log('Database connection successful:', rows);
  } catch (err) {
    console.error('Database connection failed:', err.message);
    throw err;
  }

  return promisePool;
};

module.exports = connectDB;
