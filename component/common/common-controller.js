const Boom = require('boom');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const envUtil = require('../../utilities/env');
const commonModel = require('./common-model');

exports.register = async (body) => {
  const existsAuth = await commonModel.getAuth(body.username);
  if (existsAuth) {
    throw Boom.notAcceptable('Người dùng đã tồn tại');
  }

  const hashPassword = crypto.createHash('sha256').update(body.password).digest('hex');
  const authWillInsert = {
    username: body.username,
    password: hashPassword,
  };

  const auth = await commonModel.addAuth(authWillInsert);
  const authReturn = {
    id: auth.id || 0,
    username: auth.username,
  };
  return authReturn;
};

exports.auth = async (body) => {
  const auth = await commonModel.getAuth(body.username);
  if (!auth) {
    throw Boom.notFound('Thông tin đăng nhập không đúng');
  }

  const hashPassword = crypto.createHash('sha256').update(body.password).digest('hex');
  if (hashPassword !== auth.password) {
    throw Boom.notAcceptable('Thông tin đăng nhập không đúng');
  }

  const expiresTime = Date.now() / 1000 + 60 * 60 * 24 * 7;
  const data = {
    expired_at: expiresTime,
  };

  const token = jwt.sign({
    exp: expiresTime,
    data,
  }, envUtil.SECRET_KEY);

  data.token = token;
  return data;
};
