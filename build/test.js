"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {nearlines, lineDetail} from './interfaces/bus_api'
var bus_api_1 = require("./interfaces/bus_api");
var xxbs_1 = require("./interfaces/xxbs");
var _ = require("underscore");
var xxbs;
xxbs = xxbs_1.Xxbs.getInstance();
/*xxbs.lineDetail({
    name: '700路'
}, function(err, data){
    if (err) {
        console.log('err:', err)
        return
    }
    if (_.isObject(data.data)) {
        console.dir(DataAdapter.getInstance().transform('xxbs', data.data), {depth: null})
    } else {
        console.log(data.data)
    }
})*/
/*nearlines({
    lineName: '700',
    direction: '0',
    lineNo: '700',
    cityId: '034',
})

lineDetail({
    lineId: '021-700-1',
    direction: '0',
    //stationName: '700',
    //nextStationName: '700',
    cityId: '034',
})*/
/*Bus_api.getInstance().lineDetail({
    //lineId: '021-700-0',
    //lineId: '002133067162',
    direction: '0',
    //stationName: '700',
    //nextStationName: '700',
    cityId: '034',
}, function(err, result) {
    if (err) {
        console.log(err)
    } else {
        console.dir(result, {depth: null})
    }
})*/
/*Bus_api.getInstance().baseSearch({
    key: '143',
}, function(err, result) {
    if (err) {
        console.log(err)
    } else {
        console.dir(result, {depth: null})
    }
})*/
/*Line.sync({force: false}).then(function() { //建表语句
    Line.count().then(function(cnt) {
        console.log(cnt)
    }).catch(function(err) {
        console.log(err)
    })
}).catch(function(err) {
    console.log(err)
})*/
/*publish('upset_line', 'upset.line.binding', {name: 'xqq'}, function(err, result) {
    if (err) {
        console.log('创建队列2失败')
    } else {
        console.log(result)
    }
});*/
bus_api_1.Bus_api.getInstance().baseSearch({
    key: '闵行6路'
}, function (err, content) {
    if (err || !_.isObject(content)) {
        console.log(err || '不合法的json字符串');
    }
    else {
        console.log("lineId: " + content.lines[0].lineId);
        bus_api_1.Bus_api.getInstance().lineDetail({
            lineId: content.lines[0].lineId,
            direction: '2',
            stationName: '沪闵路报春路',
            //nextStationName: '700',
            cityId: '034',
        }, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.dir(result, { depth: null });
            }
        });
    }
});
