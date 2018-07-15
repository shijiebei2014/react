"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
var db_1 = require("../../db");
exports.default = db_1.default.define('city', {
    cityName: Sequelize.STRING,
    provinceName: Sequelize.STRING,
    _58_domain: Sequelize.STRING
}, {
    freezeTableName: true,
});
