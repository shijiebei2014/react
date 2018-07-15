"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
var db_1 = require("../db");
exports.default = db_1.default.define('line', {
    lineId: Sequelize.STRING,
    lineNo: Sequelize.STRING,
    name: Sequelize.STRING,
    endSn: Sequelize.STRING,
}, {
    freezeTableName: true,
});
