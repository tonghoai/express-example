const db = require('../../utilities/sequelize');

exports.getAuth = async (username) => {
  const auth = await db.authentications
    .findOne({ where: { username } });

  return auth;
};

exports.addAuth = async (body) => {
  const auth = await db.authentications
    .create(body);

  return auth;
};
