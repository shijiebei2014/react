"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var urllib = require("urllib");
var Bus = /** @class */ (function () {
    function Bus() {
        this.mapping = {};
    }
    Bus.getInstance = function () {
        if (Bus.instance == null) {
            Bus.instance = new Bus();
        }
        return Bus.instance;
    };
    Bus.prototype.lineDetail = function (params, cb) {
        var name = params.name;
        var detail = null;
        return urllib.request("http://61.129.57.81:8181/interface/getBase.ashx?sign=&name=" + escape(name), {
            type: 'GET',
            dataType: 'text',
            timeout: 30 * 1000,
        }).then(function (data) {
            return data.data;
        }).then(function (data) {
            var ret = {};
            var keys = ['end_earlytime', 'end_latetime', 'end_stop', 'line_id', 'line_name', 'start_earlytime', 'start_latetime', 'start_stop'];
            ret = keys.reduce(function (memo, k) {
                // "<" + k + ">(\\s+)(.*)(\\s+)</" + k + ">"
                var re = new RegExp("<" + k + ">(\\s+)(.*)(\\s+)</" + k + ">", 'g');
                var result = re.exec(data);
                if (Array.isArray(result) && result.length > 2) {
                    ret[k] = result[2];
                }
                return ret;
            }, ret);
            if (ret["line_id"]) {
                detail = ret;
                return ret;
            }
            throw new Error('查询是失败');
        }).then(function (data) {
            var promises = [1, 0].map(function (dir) {
                return urllib.request('http://61.129.57.81:8181/interface/getStopList.ashx?name=' + escape(name) + '&lineid=' + data["line_id"] + '&dir=' + dir, {
                    type: 'GET',
                    dataType: 'json',
                    timeout: 30 * 1000,
                });
            });
            return Promise.all(promises);
        }).then(function (data) {
            if (typeof cb === 'function') {
                cb(null, data.reduce(function (memo, d, index) {
                    var stops = d.data.data;
                    memo['lineResults' + index] = {
                        direction: !index,
                        name: detail.line_name,
                        line: {
                            desc: '',
                            direction: Number(!index),
                            startSn: detail.start_stop,
                            endSn: detail.end_stop,
                            firstTime: detail.end_earlytime,
                            lastTime: detail.end_latetime,
                            name: detail.line_name,
                            lineId: detail.line_id
                        },
                        lines: stops.map(function (s) {
                            return {
                                zdmc: s.name,
                                id: s.id,
                                order: s.id
                            };
                        })
                    };
                    return memo;
                }, {}));
            }
        }).catch(function (err) {
            if (typeof cb == 'function') {
                cb(err, null);
            }
            else {
                console.log(err);
                return err;
            }
        });
    };
    Bus.prototype.nearlines = function () {
    };
    Bus.prototype.baseSearch = function () {
    };
    Bus.instance = null;
    return Bus;
}());
exports.Bus = Bus;
