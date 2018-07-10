"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//var urllib = require('urllib')
//var util = require('util')
var _ = require("underscore");
var urllib = require("urllib");
var xxbs_1 = require("../interfaces/xxbs");
var bus_1 = require("../interfaces/bus");
var jsonUtil_1 = require("../utils/jsonUtil");
var xxbs = xxbs_1.Xxbs.getInstance();
var bus = bus_1.Bus.getInstance();
var index = function (req, res) {
    console.log('首页');
    res.render('index');
};
var search = function (req, res) {
    console.log('搜索');
    var name = req.query.name;
    console.dir(req.query);
    xxbs.lineDetail({
        name: name
    }).then(function (data) {
        if (_.isObject(data.data)) {
            res.json(data.data);
        }
        else {
            res.json(null);
        }
    }).catch(function (err) {
        if (err) {
            console.log(err);
            res.status(500);
            res.json(null);
        }
    });
};
var search_stop = function (req, res) {
    var name = req.query.name, stopid = req.query.stopid, direction = req.query.direction;
    console.log('lineid:', xxbs.mapping[name]);
    var config = jsonUtil_1.read();
    urllib.request('http://xxbs.sh.gov.cn:8080/weixinpage/HandlerBus.ashx', {
        type: 'GET',
        dataType: 'json',
        timeout: 0.1 * 1000,
        data: {
            "name": name,
            "lineid": config[name],
            "stopid": Number(stopid),
            "direction": Number(direction),
            action: "Three"
        }
    }).then(function (data) {
        if (!data.data) {
            throw new Error('查询失败');
        }
        res.json(data.data);
    }).catch(function (err) {
        // res.status(500)
        // res.send(err)
        console.log('direction:', 'http://61.129.57.81:8181/interface/getCarmonitor.ashx?name=' + escape(name) + '&lineid=' + config[name] + '&stopid=' + Number(stopid) + '&dir=' + (Number(!Number(direction))));
        return urllib.request('http://61.129.57.81:8181/interface/getCarmonitor.ashx?name=' + escape(name) + '&lineid=' + config[name] + '&stopid=' + Number(stopid) + '&dir=' + (Number(!Number(direction))), {
            type: 'GET',
            dataType: 'json',
            timeout: 60 * 1000,
        });
    }).then(function (data) {
        console.log(data.data.data);
        res.json({ cars: [data.data.data] });
    }).catch(function (err) {
        console.log('3:', err);
        res.status(500);
        res.send(err);
    });
};
var search_bus_api = function (req, res) {
    console.log('搜索2');
    var name = req.query.name;
    console.dir(req.query);
    bus.lineDetail({
        name: name
    }, function (err, result) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(result);
        }
    });
    /*var bus_api = Bus_api.getInstance();
    bus_api.baseSearch({
        key: name
    }, function(err, content) {
        if (err || !_.isObject(content)) {
            res.status(500).send(err || '不合法的json字符串')
        } else {
            console.log(`lineId: ${content.lines[0].lineId}`);
            bus_api.lineDetail({
                lineId: content.lines[0].lineId,
                direction: '0',
                cityId: '034',
            }, function(err, result) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.json(result)
                }
            })
        }
    })*/
};
var search_weather = function (req, res) {
    urllib.request('http://wgeo.weather.com.cn/index.html', {
        type: 'GET',
        dataType: 'text',
        timeout: 60 * 1000,
    }).then(function (data) {
        var str = data.data;
        var reg = /var id= "(.*)"/g;
        var id = req.query.id || reg.exec(str)[1];
        console.log('id:', id);
        return urllib.request("http://d1.weather.com.cn/dingzhi/" + id + ".html", {
            type: 'GET',
            dataType: 'text',
            timeout: 60 * 1000,
            headers: {
                'referer': 'http://www.weather.com.cn/'
            }
        });
    }).then(function (data) {
        res.send(data.data);
    }).catch(function (err) {
        res.status(500);
        res.send(err);
    });
};
function router(app, checkAuth) {
    app.get('/', index);
    app.get('/search', search);
    app.get('/search_stop', search_stop);
    app.get('/search_bus_api', search_bus_api);
    app.get('/search_weather', search_weather);
}
exports.router = router;
