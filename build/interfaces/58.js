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
var urllib = require("urllib");
var cheerio = require("cheerio");
var city_1 = require("../models/rent/city");
var get_domain = function () {
    return __awaiter(this, void 0, void 0, function () {
        var URL, retObj, content, $_1, dds, promises, index, dd, cities, province;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    URL = "http://www.58.com/changecity.aspx";
                    return [4 /*yield*/, urllib.request(URL, { type: 'GET' })];
                case 1:
                    retObj = _a.sent();
                    if (!(retObj.status == 200)) return [3 /*break*/, 4];
                    content = retObj
                        .data
                        .toString();
                    $_1 = cheerio.load(content);
                    dds = $_1('#clist').find('dd');
                    console.log("dds: " + dds.length);
                    console.log(dds.length);
                    promises = [];
                    for (index = 1; index < dds.length; index++) {
                        dd = dds.eq(index);
                        cities = dd.children('a');
                        province = dd
                            .prev()
                            .text();
                        if (province == '其他') { }
                        else if (province == '海外') { }
                        else {
                            //console.log(`${province}`);
                            cities
                                .each(function (i) {
                                var city = $_1(this);
                                var city_name = city
                                    .text()
                                    .trim();
                                var href = city
                                    .attr('href')
                                    .trim();
                                //console.log(`\t${city_name}---${href}`)
                                promises.push(city_1.default.findOrCreate({
                                    where: {
                                        cityName: city_name
                                    },
                                    defaults: {
                                        provinceName: province,
                                        _58_domain: href
                                    }
                                }));
                            });
                        }
                    }
                    return [4 /*yield*/, city_1.default.sync({ force: false })];
                case 2:
                    _a.sent();
                    console.log(123);
                    return [4 /*yield*/, Promise.all(promises)];
                case 3:
                    _a.sent();
                    console.log('完成');
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
};
get_domain().catch(function (err) {
    console.log(err);
});
