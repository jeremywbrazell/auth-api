'use strict';

const wineModel = (sequelize, DataTypes) => sequelize.define('wine', {
    name: { type: DataTypes.STRING, required: true},
    styles: { type: DataTypes.STRING, required: true},
    location: { type: DataTypes.STRING, required: true}
})

module.exports = wineModel;