const { Sequelize } = require('sequelize');
const config = require('./config');

let sequelize;

const connectDB = () => {
  if (process.env.NODE_ENV !== 'test') {
    // MySQL for development and production
    sequelize = new Sequelize(
      config.development.database,
      config.development.user,
      config.development.password,
      {
        host: config.development.host,
        dialect: config.development.dialect,
      }
    );
  } else {
    // SQLite for testing
    console.log('Running tests with SQLite in-memory database');
    sequelize = new Sequelize(config.test.database, config.test.user, config.test.password, {
      dialect: config.test.dialect,
      storage: config.test.storage,
      logging: false,
    });
  }

  return sequelize.sync({ force: true });
};

module.exports = {
  connectDB, 
};
