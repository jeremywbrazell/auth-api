'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const beerModel = require('./beer/beerModel.js');
const wineModel = require('./wine/wineModel.js');
const Collection = require('./data-collection.js');
const userModel = require('./users.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);
const beer = beerModel(sequelize, DataTypes);
const wine = wineModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  beer: new Collection(beer),
  wine: new Collection(wine),
};