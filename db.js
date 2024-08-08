const mysql = require("mysql");
const config = require("./config");

const connectDB = () => {
  return new Promise((resolve, reject) => {
    const pool = mysql.createPool(config);

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
};

module.exports = connectDB;
