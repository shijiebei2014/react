//var urllib = require('urllib')
//var util = require('util')
import * as _ from 'underscore'
import urllib = require('urllib')
import {Xxbs} from '../interfaces/xxbs'
import {Bus_api} from '../interfaces/bus_api';
import {write, read, is_json_string} from '../utils/jsonUtil'
let xxbs = Xxbs.getInstance()
const index = function(req, res) {
	console.log('首页')
	res.render('index')
}

const search = function(req, res) {
	console.log('搜索')
	var name = req.query.name
	console.dir(req.query)
	xxbs.lineDetail({
		name: name
	}/*, function(err, data){
		if (err) {
			console.log(err)
			res.status(500)
			res.json(err) 
		}
		if (_.isObject(data.data)) {
			res.json(data.data)
			// if (data.data instanceof Buffer) {
			// 	if (data && data.data) {
			// 		let string = data.data.toString()
			// 		//console.log(string)
			// 		string = string.replace('**YGKJ', '').replace('YGKJ##', '')

			// 		let result = is_json_string(string) && JSON.parse(string)
			// 		if (result) {
			// 			//console.dir(result.jsonr.data)
			// 			return res.json(result.jsonr.data)
			// 		}
			// 	}
			// 	res.status(500).send('请求失败')
			// } else {
			// 	console.log(data.data.toString())
			// 	res.json(data.data)
			// }
		} else {
			//res.send(data.data)
			res.json(null)
		}
	}*/).then(function(data) {
		if (_.isObject(data.data)) {
			res.json(data.data)
		} else {
			res.json(null)
		}
	}).catch(function(err) {
		if (err) {
			console.log(err)
			res.status(500)
			res.json(err) 
		}
	})
}

const search_stop = function(req, res) {
	var name = req.query.name, stopid = req.query.stopid, direction = req.query.direction;
	console.log('lineid:', xxbs.mapping[name])

	var config = read();
	urllib.request('http://xxbs.sh.gov.cn:8080/weixinpage/HandlerBus.ashx', {
		type: 'GET',
		dataType: 'json',
		timeout: 60 * 1000,
		data: {
			"name": name,
			"lineid": config[name], //xxbs.mapping[name],
			"stopid": Number(stopid),
			"direction": Number(direction),
			action: "Three"
		}
	}).then(function(data) {
		res.json(data.data)
	}).catch(function(err) {
		res.status(500)
		res.send(err)
	})
}

const search_bus_api = function(req, res) {
	console.log('搜索2')
	var name = req.query.name
	console.dir(req.query);
	var bus_api = Bus_api.getInstance();
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
	})
}

const search_weather = function(req, res) {
	urllib.request('http://wgeo.weather.com.cn/index.html', {
		type: 'GET',
		dataType: 'text',
		timeout: 60 * 1000,
	}).then(function(data) {
		let str = data.data;
		let reg = /var id= "(.*)"/g
        let id = req.query.id || reg.exec(str)[1]
        console.log('id:', id)
        return urllib.request(`http://d1.weather.com.cn/dingzhi/${id}.html`, {
			type: 'GET',
			dataType: 'text',
			timeout: 60 * 1000,
			headers: {
              'referer': 'http://www.weather.com.cn/'
            }
		})
	}).then(function(data) {
		res.send(data.data)
	}).catch(function(err) {
		res.status(500)
		res.send(err)
	})
}

export function router(app, checkAuth) {
	app.get('/', index);
	app.get('/search', search);
	app.get('/search_stop', search_stop);
	app.get('/search_bus_api', search_bus_api)
	app.get('/search_weather', search_weather)
}