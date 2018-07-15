"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
exports.is_json_string = function (jsonstring) {
    var flag = true;
    try {
        JSON.parse(jsonstring);
    }
    catch (e) {
        flag = false;
    }
    finally {
        return flag;
    }
};
exports.read = function (p) {
    if (p === void 0) { p = path.join(__dirname, '../../lineId.json'); }
    if (fs.existsSync(p)) {
        var content = fs.readFileSync(p).toString();
        console.log("content: " + content);
        if (exports.is_json_string(content)) {
            return JSON.parse(content);
        }
    }
    return null;
};
exports.write = function (content, p) {
    if (p === void 0) { p = path.join(__dirname, '../../lineId.json'); }
    if (fs.existsSync(p)) {
        fs.writeFileSync(p, content);
    }
    return false;
};
