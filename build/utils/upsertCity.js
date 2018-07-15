"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var city_1 = require("../models/city");
var urllib = require("urllib");
var es6_promise_1 = require("es6-promise");
city_1.default.sync({ force: false })
    .then(function () {
    return urllib.request('http://web.chelaile.net.cn/cdatasource/citylist', {
        type: 'GET',
        dataType: 'json',
        timeout: 60 * 1000,
        dataAsQueryString: true,
        data: {
            type: 'allRealtimeCity',
            s: 'h5',
            v: '3.3.9',
            src: 'webapp_weixin_mp',
            userId: 'ou7QDj1DSqpAC6m6XB_RlicBav3c',
            cityId: '034',
        },
        headers: {
            Accept: 'application/json, text/plain, */*',
            Referer: 'http://web.chelaile.net.cn/ch5/index.html?showFav=1&utm_source=weixinmp&wxckey=CK1298484483775&src=webapp_weixin_mp&s=browser&utm_medium=menu&homePage=linearound&userId=ou7QDj1DSqpAC6m6XB_RlicBav3c&cityId=034&cityVersion=2&supportSubway=1&cityName=%E4%B8%8A%E6%B5%B7',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
})
    .then(function (response) {
    var cities = response.data && response.data.data && response.data.data["allRealtimeCity"] ? response.data.data["allRealtimeCity"] : null;
    if (cities) {
        var ps = cities.map(function (city) {
            if (city && city.cityId) {
                /*var opt = {
                    where: {
                        cityId: city.cityId,
                        
                    },
                    defaults: city
                }
                console.log(opt)
                return City.findOrCreate(opt)*/
                return city_1.default.upsert(city);
            }
            else {
                return es6_promise_1.Promise.resolve(null);
            }
        });
        return es6_promise_1.Promise.all(ps);
    }
    else {
        console.log(response.data);
    }
})
    .then(function () {
    console.log('成功');
})
    .catch(function (err) {
    console.log(err);
});
function _is_json_string(jsonstring) {
    var flag = true;
    try {
        flag = JSON.parse(jsonstring);
    }
    catch (e) {
        flag = false;
    }
    finally {
        return flag;
    }
}
