var urllib = require('urllib')
var util = require('util')

var mapping = {}
var index = function(req, res) {
	console.log('首页')
	res.render('index')
}

var search = function(req, res) {
	console.log('搜索')
	var name = req.query.name
	urllib.request('http://xxbs.sh.gov.cn:8080/weixinpage/HandlerOne.ashx', {
		type: 'GET',
		dataType: 'json',
		timeout: 60 * 1000,
		data: {
			"name": name
		}
	}).then(function(data) {
		if (util.isObject(data.data)) {
			mapping[name] = data.data.line_id
			return urllib.request('http://xxbs.sh.gov.cn:8080/weixinpage/HandlerTwo.ashx', {
				type: 'GET',
				dataType: 'json',
				timeout: 60 * 1000,
				data: {
					"name": name,
					"lineid": data.data.line_id
				}
			})
		} else {
			return new Promise(function(resolve) {
				resolve(data.data.toString())
			})
		}
	}).then(function(data) {
		if (util.isObject(data.data)) {
			res.json(data.data)
		} else {
			res.send(data.data)
		}
	}).catch(function(err) {
		res.status(500)
		res.json(err)
	})
}

var search_stop = function(req, res) {
	var name = req.query.name, stopid = req.query.stopid, direction = req.query.direction;
	console.log('lineid:', mapping[name])
	urllib.request('http://xxbs.sh.gov.cn:8080/weixinpage/HandlerThree.ashx', {
		type: 'GET',
		dataType: 'json',
		timeout: 60 * 1000,
		data: {
			"name": name,
			"lineid": mapping[name],
			"stopid": stopid,
			"direction": direction,
		}
	}).then(function(data) {
		res.json(data.data)
	}).catch(function(err) {
		res.status(500)
		res.send(err)
	})
}

var _is_json_string = function(jsonstring) {
	var flag = true
	try {
		JSON.parse(jsonstring)
	} catch(e) {
		flag = false
	} finally {
		return flag
	}
}

module.exports = function(app, checkAuth) {
	app.get('/', index);
	app.get('/search', search);
	app.get('/search_stop', search_stop);
}