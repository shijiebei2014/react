/// <reference types="es6-promise"/>
//-import {Promise} from "es6-promise"
import * as cheerio from 'cheerio'
import * as _ from 'underscore'
import * as urllib from 'urllib'
import {Bus_api} from '../interfaces/bus_api'
import Line from '../models/line'

const host = 'http://shanghai.8684.cn'
let path = '/list1', buses = [];

function get_bus(href, buses) {
	return urllib.request(`${host}${path}`, {
		type: 'GET',
		timeout: 60 * 1000,
	}).then(function(data) {
		let $ = cheerio.load(data.data.toString())
		let nums = $('#con_site_1 a')
		nums.each(function(i, el) {
			let ele = $(this)
			if (ele && ele.text()) {
				buses.push(ele.text())
			}
		})
		return buses
	}).catch(function(err) {
		console.log(err)
	})	
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


let _is_json_string = function(jsonString) {
	var flag = true
	try {
		JSON.parse(jsonString)
	} catch(e) {
		flag = false
	} finally {
		return flag
	}
}

let get_all_routes = async function() {
	let data = await urllib.request(`${host}${path}`, {
		type: 'GET',
		timeout: 60 * 1000,
	});
	//获取所有线路
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
	//获取所有的公交线路
	let promises = paths.slice(0, 5).map((path) => {
		if (path == '/list1') {
			Promise.resolve(null)
		} else {
			get_bus(path, buses)
		}
	})
	await Promise.all(promises)
	//通过接口获取数据
	let datas = []
	for(let bus of buses.slice(0, 1)){
		var bus_name = bus.substring(0, bus.indexOf('路') == -1 ? bus.length : bus.indexOf('路'))
		console.log('bus_name:', bus_name)
		let data = await Bus_api.getInstance().baseSearch2({
			key: bus_name,
		})
		datas.push(data)
	}
	//通过接口获取数据
	console.log('datas:', datas.length)
	let index = 0;
	let results = datas.map(data => {
		if (data && data["data"]) {
			let string = data["data"].toString()
			string = string.replace('**YGKJ', '').replace('YGKJ##', '')
			let result = _is_json_string(string) && JSON.parse(string)

			if (result) {
				return result.jsonr.data
			} else {
				console.log(buses[index] + '查询失败')
			}
		}
		index++;
		return ''
	})
	datas = _.compact(results)
	console.log(datas);
	//console.dir(datas[0].lines)
	for(let data of datas) {
		console.log('dataaa', data)
		if (data && _.isArray(data["lines"]) && data["lines"].length > 0) {
			for (let x of data["lines"]) {
				console.log('create')
				await Line.create(x)
			}
		}
	}
	console.log('成功...')
}
get_all_routes();