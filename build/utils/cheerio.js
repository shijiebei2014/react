"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="es6-promise"/>
//-import {Promise} from "es6-promise"
var cheerio = require("cheerio");
var _ = require("underscore");
var urllib = require("urllib");
var bus_api_1 = require("../interfaces/bus_api");
var line_1 = require("../models/line");
var host = 'http://shanghai.8684.cn';
var path = '/list1', buses = [];
function get_bus(href, buses) {
    return urllib.request("" + host + path, {
        type: 'GET',
        timeout: 60 * 1000,
    }).then(function (data) {
        var $ = cheerio.load(data.data.toString());
        var nums = $('#con_site_1 a');
        nums.each(function (i, el) {
            var ele = $(this);
            if (ele && ele.text()) {
                buses.push(ele.text());
            }
        });
        return buses;
    }).catch(function (err) {
        console.log(err);
    });
}
/*urllib.request(`${host}${path}`, {
    type: 'GET',
    timeout: 60 * 1000,
}).then((data)=>{ //获取所有线路
    let $ = cheerio.load(data.data.toString()), paths = [path]
    let nums = $('.bus_kt_r1 a')
    nums.each(function(i, el) {
        let ele = $(this)
        if (ele && ele.attr('href')) {
            paths.push(ele.attr('href'))
        }
    })
    nums = $('.bus_kt_r2 a')
    nums.each(function(i, el) {
        let ele = $(this)
        if (ele && ele.attr('href')) {
            paths.push(ele.attr('href'))
        }
    })
    if (path == '/list1') {
        nums = $('#con_site_1 a')
        nums.each(function(i, el) {
            let ele = $(this)
            if (ele && ele.text().trim()) {
                buses.push(ele.text().trim())
            }
        })
    }
    return paths
}).then(function(paths) { //获取所有的公交线路
    let promises = paths.slice(0, 5).map((path) => {
        if (path == '/list1') {
            Promise.resolve(null)
        } else {
            get_bus(path, buses)
        }
    })
    return Promise.all(promises)
}).then(function() { //通过接口获取数据
    let promises = buses.slice(0, 5).map(function(bus) {
        var bus_name = bus.substring(0, bus.indexOf('路') == -1 ? bus.length : bus.indexOf('路'))
        console.log('bus_name:', bus_name)
        return Bus_api.getInstance().baseSearch2({
            key: bus_name,
        })
        //Promise.resolve(1)
    })
    return Promise.all(promises)
}).then(function(datas) { //通过接口获取数据
    console.dir('datas:', datas)
    let results = datas.map(function(data) {
        if (data && data.data) {
            let string = data.data.toString()
            string = string.replace('**YGKJ', '').replace('YGKJ##', '')
            let result = _is_json_string(string) && JSON.parse(string)
            if (result) {
                return result.jsonr.data
            }
        }
        return ''
    })
    return _.compact(results)
}).then(function(datas) {
    //console.dir(datas[0].lines)
    let promises = datas.map(function(data) {
        if (data && _.isArray(data.lines) && data.lines.length > 0) {
            let ps = data.lines.map(function(x) {
                Line.create(x)
            })
            return Promise.all(ps)
        } else {
            return Promise.resolve(null)
        }
    })
    return Promise.all(promises)
}).then(function() {
    console.log('成功...')
}).catch(function(err) {
    console.log(err)
})*/
var _is_json_string = function (jsonString) {
    var flag = true;
    try {
        JSON.parse(jsonString);
    }
    catch (e) {
        flag = false;
    }
    finally {
        return flag;
    }
};
var get_all_routes = function () {
    return __awaiter(this, void 0, void 0, function () {
        var data, $, paths, nums, promises, datas, _i, _a, bus, bus_name, data_1, index, results, _b, datas_1, data_2, _c, _d, x;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, urllib.request("" + host + path, {
                        type: 'GET',
                        timeout: 60 * 1000,
                    })];
                case 1:
                    data = _e.sent();
                    $ = cheerio.load(data.data.toString()), paths = [path];
                    nums = $('.bus_kt_r1 a');
                    nums.each(function (i, el) {
                        var ele = $(this);
                        if (ele && ele.attr('href')) {
                            paths.push(ele.attr('href'));
                        }
                    });
                    nums = $('.bus_kt_r2 a');
                    nums.each(function (i, el) {
                        var ele = $(this);
                        if (ele && ele.attr('href')) {
                            paths.push(ele.attr('href'));
                        }
                    });
                    if (path == '/list1') {
                        nums = $('#con_site_1 a');
                        nums.each(function (i, el) {
                            var ele = $(this);
                            if (ele && ele.text().trim()) {
                                buses.push(ele.text().trim());
                            }
                        });
                    }
                    promises = paths.slice(0, 5).map(function (path) {
                        if (path == '/list1') {
                            Promise.resolve(null);
                        }
                        else {
                            get_bus(path, buses);
                        }
                    });
                    return [4 /*yield*/, Promise.all(promises)
                        //通过接口获取数据
                    ];
                case 2:
                    _e.sent();
                    datas = [];
                    _i = 0, _a = buses.slice(0, 1);
                    _e.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    bus = _a[_i];
                    bus_name = bus.substring(0, bus.indexOf('路') == -1 ? bus.length : bus.indexOf('路'));
                    console.log('bus_name:', bus_name);
                    return [4 /*yield*/, bus_api_1.Bus_api.getInstance().baseSearch2({
                            key: bus_name,
                        })];
                case 4:
                    data_1 = _e.sent();
                    datas.push(data_1);
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    //通过接口获取数据
                    console.log('datas:', datas.length);
                    index = 0;
                    results = datas.map(function (data) {
                        if (data && data["data"]) {
                            var string = data["data"].toString();
                            string = string.replace('**YGKJ', '').replace('YGKJ##', '');
                            var result = _is_json_string(string) && JSON.parse(string);
                            if (result) {
                                return result.jsonr.data;
                            }
                            else {
                                console.log(buses[index] + '查询失败');
                            }
                        }
                        index++;
                        return '';
                    });
                    datas = _.compact(results);
                    console.log(datas);
                    _b = 0, datas_1 = datas;
                    _e.label = 7;
                case 7:
                    if (!(_b < datas_1.length)) return [3 /*break*/, 12];
                    data_2 = datas_1[_b];
                    console.log('dataaa', data_2);
                    if (!(data_2 && _.isArray(data_2["lines"]) && data_2["lines"].length > 0)) return [3 /*break*/, 11];
                    _c = 0, _d = data_2["lines"];
                    _e.label = 8;
                case 8:
                    if (!(_c < _d.length)) return [3 /*break*/, 11];
                    x = _d[_c];
                    console.log('create');
                    return [4 /*yield*/, line_1.default.create(x)];
                case 9:
                    _e.sent();
                    _e.label = 10;
                case 10:
                    _c++;
                    return [3 /*break*/, 8];
                case 11:
                    _b++;
                    return [3 /*break*/, 7];
                case 12:
                    console.log('成功...');
                    return [2 /*return*/];
            }
        });
    });
};
get_all_routes();
