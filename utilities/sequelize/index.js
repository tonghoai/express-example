const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const envUtil = require('../env');

const db = {};

const sequelize = new Sequelize(envUtil.MYSQL_DB, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

fs
  .readdirSync(`${__dirname}/models`)
  .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(`${__dirname}/models`, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

// Note: drop and create database
if (envUtil.SEQUELIZE_MIGRATE_DB) {
  sequelize.sync({ force: true });
}

module.exports = db;
