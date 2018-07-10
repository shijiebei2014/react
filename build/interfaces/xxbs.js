"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var urllib = require("urllib");
var _ = require("underscore");
var constants_1 = require("../utils/constants");
var jsonUtil_1 = require("../utils/jsonUtil");
var Xxbs = /** @class */ (function () {
    function Xxbs() {
        this.mapping = {};
    }
    Xxbs.getInstance = function () {
        if (Xxbs.instance == null) {
            Xxbs.instance = new Xxbs();
        }
        return Xxbs.instance;
    };
    Xxbs.prototype.lineDetail = function (params, cb) {
        var _this = this;
        var name = params.name;
        console.log(name);
        return urllib.request("" + constants_1.XXBS_HOST + constants_1.XXBS_PATH + constants_1.XXBS_ONE, {
            type: 'GET',
            //dataType: 'json',
            timeout: 0.1 * 1000,
            dataAsQueryString: true,
            data: {
                "action": 'One',
                "name": name
            }
        }).then(function (data) {
            if (data.data && jsonUtil_1.is_json_string(data.data) && _.isObject(JSON.parse(data.data))) {
                _this.mapping[name] = JSON.parse(data.data).line_id;
                if (_this.mapping[name]) {
                    var config = jsonUtil_1.read();
                    config[name] = _this.mapping[name];
                    jsonUtil_1.write(JSON.stringify(config));
                }
                // console.log(`${HOST}${PATH}${TWO}`)
                // console.log({
                // 		"action": 'Two',
                // 		"name": name,
                // 		"lineid": this.mapping[name]
                // 	})
                return urllib.request("" + constants_1.XXBS_HOST + constants_1.XXBS_PATH + constants_1.XXBS_TWO, {
                    type: 'GET',
                    dataType: 'json',
                    timeout: 60 * 1000,
                    dataAsQueryString: true,
                    data: {
                        "action": 'Two',
                        "name": name,
                        "lineid": _this.mapping[name]
                    }
                });
            }
            else {
                return data.data.toString();
                /*return Bus_api.getInstance().baseSearch2({
                    key: name,
                });*/
            }
        }).then(function (data) {
            // console.dir(data)
            if (typeof cb == 'function') {
                cb(null, data);
            }
            else {
                console.log(data);
                return data;
            }
        }).catch(function (err) {
            console.log(err);
            if (typeof cb == 'function') {
                cb(err, null);
            }
            else {
                console.log(err);
                return err;
            }
        });
    };
    Xxbs.prototype.nearlines = function () {
    };
    Xxbs.prototype.baseSearch = function () {
    };
    Xxbs.instance = null;
    return Xxbs;
}());
exports.Xxbs = Xxbs;
