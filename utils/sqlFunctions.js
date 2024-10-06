const mysql = require("mysql2");
const config = require("../db/config")[process.env.NODE_ENV || 'development']; 

const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

const createTable = (schema) => {
  return new Promise((resolve, reject) => {
    pool.query(schema, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} SET ?`;

    pool.query(query, [record], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const updateRecord = (tableName, updates, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE ${tableName} SET ? WHERE ${column} = ?`;

    pool.query(query, [updates, value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const getRecord = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    
    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

const getSpecificRecords = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results : []); 
      }
    });
  });
};

const getAllRecords = (tableName) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName}`;  // No WHERE clause, just fetch all records
    pool.query(query, (err, results) => {
      if (err) {
        reject(err);  // Reject if an error occurs
      } else {
        resolve(results);  // Return all the records
      }
    });
  });
};


const deleteRecord = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM ${tableName} WHERE ${column} = ?`;
    
    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  createTable,
  checkRecordExists,
  insertRecord,
  updateRecord,
  getRecord,
  deleteRecord,
  getAllRecords,
  getSpecificRecords
};
