require('dotenv').config(); 

const config = {
  development: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    dialect: 'mysql',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  test: {
    database: 'sqlite::memory:', 
    user: null, 
    password: null,
    dialect: 'sqlite',
    storage: ':memory:', // In-memory SQLite for testing
  },
  production: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    dialect: 'mysql',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
};

module.exports = config;
