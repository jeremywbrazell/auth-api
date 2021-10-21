'use strict';

const beerModel = (sequelize, DataTypes) => sequelize.define('Beer', {
    name: { 
        type: DataTypes.STRING, 
        required: true},
    styles: { 
        type: DataTypes.STRING, 
        required: true},
    location: { 
        type: DataTypes.STRING, 
        required: true}
})

module.exports = beerModel;