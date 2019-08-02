module.exports = {
  SECRET_KEY: process.env.SECRET_KEY || 'hoaitx',
  MYSQL_DB: process.env.MYSQL_DB || 'mysql://localhost',
  SEQUELIZE_MIGRATE_DB: process.env.SEQUELIZE_MIGRATE_DB || false,
};
