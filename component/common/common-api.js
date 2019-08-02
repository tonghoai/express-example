const express = require('express');
const Joi = require('joi');
const Boom = require('boom');
const authUtil = require('../../utilities/authentication');
const commonController = require('./common-controller');

const router = express.Router();

router.get('/', authUtil, async (req, res, next) => {
  next({ message: 'API v1' });
});

router.post('/register', async (req, res, next) => {
  const { body } = req;
  const validSchema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9._]+$/).required(),
    password: Joi.string().required(),
  });

  try {
    Joi.validate(body, validSchema, (err) => {
      if (err) throw Boom.notAcceptable(err.message);
    });

    const data = await commonController.register(body);
    next(data);
  } catch (error) {
    next({ error });
  }
});

router.post('/login', async (req, res, next) => {
  const { body } = req;
  const validSchema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9._]+$/).required(),
    password: Joi.string().required(),
  });

  try {
    Joi.validate(body, validSchema, (err) => {
      if (err) throw Boom.notAcceptable(err.message);
    });

    const data = await commonController.auth(body);
    next(data);
  } catch (error) {
    next({ error });
  }
});

module.exports = { router, name: 'commons' };
