const { Sequelize } = require('sequelize');

// Configuration for the test environment
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Use SQLite in-memory for testing
  logging: false, 
});

module.exports = sequelize;