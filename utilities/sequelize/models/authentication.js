const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const authentications = sequelize.define('authentications', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['username'],
        }
      ]
    });

  return authentications;
};
