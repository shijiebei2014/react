"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
var db_1 = require("../db");
exports.default = db_1.default.define('city', {
    cityId: Sequelize.STRING,
    cityName: Sequelize.STRING,
    cityVersion: Sequelize.STRING,
    hot: Sequelize.INTEGER,
    pinyin: Sequelize.STRING,
    supportSubway: Sequelize.INTEGER,
}, {
    freezeTableName: true,
});
