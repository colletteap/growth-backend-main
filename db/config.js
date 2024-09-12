require('dotenv').config(); 

const config = {
  development: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    dialect: 'mysql2',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:', // In-memory SQLite for testing
  },
  production: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    dialect: 'mysql2',
  },
};

module.exports = config;
