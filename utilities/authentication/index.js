const Boom = require('boom');
const jwt = require('jsonwebtoken');
const envUtil = require('../env');

module.exports = (req, res, next) => {
  const token = req.header('authorization');
  if (!token) {
    return next({ error: Boom.unauthorized('Không có quyền thực hiện chức năng này') });
  }

  try {
    jwt.verify(token, envUtil.SECRET_KEY);
  } catch (err) {
    return next({ error: Boom.unauthorized('Quyền không hợp lệ') });
  }

  return next();
};
