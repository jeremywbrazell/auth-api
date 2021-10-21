'use strict';

const express = require('express');
const dataModules = require('../models/modelsIndex.js');

const basicAuth = require('../middleware/basic.js')
const bearerAuth = require('../middleware/bearer.js');
const acl = require('../middleware/acl.js');

// const { users } = require('../models/modelsIndex.js');

const authRouter = express.Router();

authRouter.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

authRouter.get('/:model', basicAuth, acl('read'), handleGetAll);
authRouter.get('/:model/:id', basicAuth, acl('read'), handleGetOne);
authRouter.post('/:model', bearerAuth, acl('create'), handleCreate);
authRouter.put('/:model/:id', bearerAuth, acl('update'), handleUpdate);
authRouter.delete('/:model/:id', bearerAuth, acl('delete'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}


module.exports = authRouter;