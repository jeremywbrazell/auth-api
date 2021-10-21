'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/modelsIndex.js');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer');
const permissions = require('../middleware/acl.js');


authRouter.post('/register', async (req, res, next) => {
  console.log('i made it');
  try {
    let userRecord = await users.create(req.body);
    console.log('this is req dot body', req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
    const user = {
        user: req.user,
        token: req.user.token
    };
    res.status(200).send(user);
});

authRouter.get('/users', bearerAuth, permissions('read'), async (req, res, next) => {
  console.log('i made it to users');
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
    res.status(200).send('Welcome to the secret area')
})

module.exports = authRouter;
