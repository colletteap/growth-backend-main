const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config);

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

const updateRecord = async (req, res) => {
  try {
    console.log("PUT /profile request received with data:", req.body);

    const profile = await checkRecordExists("users", "userId", req.user.userId);

    if (!profile) {
      console.log("User not found for update:", req.user.userId);
      return res.status(404).json({ error: "User not found" });
    }

    const updates = {
      title: req.body.title || profile.title,
      bio: req.body.bio || profile.bio,
    };

    console.log("Updating user with data:", updates);
    await updateRecord("users", updates, "userId", req.user.userId);

    res.status(200).json({ message: "Profile Updated Successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createTable,
  checkRecordExists,
  insertRecord,
  updateRecord
};