import {Core} from './core'
import * as urllib from 'urllib'
import assign = require('object-assign')
import {DataAdapter} from '../utils/dataadapter'
import { BUS_BASESEARCH, BUS_HOST as HOST, BUS_APIPATH as APIPATH, BUS_NEARLINES as NEARLINES, BUS_LINEDETAIL as LINEDETAIL, BUS_Q_SID as Q_SID, BUS_USERID as USERID} from '../utils/constants'
import {is_json_string} from '../utils/jsonUtil'

export class Bus_api implements Core{
	private static instance = null;
	private constructor() {}
	public static getInstance() {
		if (!Bus_api.instance) {
			Bus_api.instance = new Bus_api()
		}
		return Bus_api.instance;
	}
	lineDetail(params, cb) {
		let data = assign(params, {
			s: 'h5',
			v: '3.3.9',
			src: 'webapp_weixin_mp',
			userId: USERID,
			h5Id: USERID,
			sign: '1',
		})

		return urllib
			.request(HOST + LINEDETAIL, {
				type: 'GET',
				contentType: 'application/json',
			    data: data,
			    dataAsQueryString: true,
			    headers: {
			        Accept: 'application/json, text/plain, */*',
			        'Q-SID': Q_SID,
			        Referer: 'http://web.chelaile.net.cn/ch5/index.html?showFav=1&utm_source=weixinmp&wxckey=CK1298484483775&src=webapp_weixin_mp&s=browser&utm_medium=menu&homePage=linearound&userId=ou7QDj1DSqpAC6m6XB_RlicBav3c&cityId=034&cityVersion=2&supportSubway=1&cityName=%E4%B8%8A%E6%B5%B7',
			        'Content-Type': 'application/x-www-form-urlencoded',
			    },
			})
			.then(function(data) {
				if (data && data.data) {
					let string = data.data.toString()
					string = string.replace('**YGKJ', '').replace('YGKJ##', '')
					let result = is_json_string(string) && JSON.parse(string)
					// console.log(string)
					if (result) {
						//console.dir(result.jsonr.data)
						
						if (typeof cb == "function") {
							return cb(null, DataAdapter.getInstance().transform('bus', result.jsonr.data))
						} else {
							return DataAdapter.getInstance().transform('bus', result.jsonr.data);
						}
					} 
				}
				if (typeof cb == "function") {
					cb(new Error('请求失败'), null)	
				} else {
					return new Error('请求失败')
				}
			})
			.catch(function(err){
				if (typeof cb == "function") {
					cb(err, null)	
				} else {
					return err;
				}
				
			})
	}
	nearlines(params, cb) {
		let data = assign(params, {
			s: 'h5',
			v: '3.3.9',
			src: 'webapp_weixin_mp',
			userId: USERID,
			h5Id: USERID,
			sign: '1',
		})
		urllib
			.request(HOST + NEARLINES, {
				type: 'GET',
				contentType: 'application/json',
			    data: data,
			    dataAsQueryString: true,
			    headers: {
			        Accept: 'application/json, text/plain, */*',
			        'Q-SID': Q_SID,
			        Referer: 'http://web.chelaile.net.cn/ch5/index.html?showFav=1&utm_source=weixinmp&wxckey=CK1298484483775&src=webapp_weixin_mp&s=browser&utm_medium=menu&homePage=linearound&userId=ou7QDj1DSqpAC6m6XB_RlicBav3c&cityId=034&cityVersion=2&supportSubway=1&cityName=%E4%B8%8A%E6%B5%B7',
			        'Content-Type': 'application/x-www-form-urlencoded',
			    },
			})
			.then(function(data) {
				if (data && data.data) {
					let string = data.data.toString()
					string = string.replace('**YGKJ', '').replace('YGKJ##', '')

					let result = is_json_string(string) && JSON.parse(string)
					if (result) {
						console.dir(result.jsonr.data)
						cb(null, result.jsonr.data)
					} 
				}
				cb(new Error('请求失败'), null)
			})
			.catch(function(err){
				cb(err, null)
				/*if (err) {
					throw err; // you need to handle error 
				}*/
			})
	}
	baseSearch(params, cb) {
		let data = assign(params, {
			s: 'h5',
			v: '3.3.9',
			src: 'webapp_weixin_mp',
			userId: USERID,
			h5Id: USERID,
			sign: '1',
			cityId: '034',
		})
		//console.log(data)
		urllib.request('http://web.chelaile.net.cn/api/basesearch/client/clientSearch.action', {
			type: 'GET',
			timeout: 60 * 1000,
			dataAsQueryString: true,
			data: data,
			headers: {
			    Accept: 'application/json, text/plain, */*',
			    'Q-SID': Q_SID,
			    Referer: 'http://web.chelaile.net.cn/ch5/index.html?showFav=1&utm_source=weixinmp&wxckey=CK1298484483775&src=webapp_weixin_mp&s=browser&utm_medium=menu&homePage=linearound&userId=ou7QDj1DSqpAC6m6XB_RlicBav3c&cityId=034&cityVersion=2&supportSubway=1&cityName=%E4%B8%8A%E6%B5%B7',
			    'Content-Type': 'application/x-www-form-urlencoded',
			},
		}).then(function(data) {
			if (data && data.data) {
				let string = data.data.toString()
				//console.log(string)
				string = string.replace('**YGKJ', '').replace('YGKJ##', '')

				let result = is_json_string(string) && JSON.parse(string)
				if (result) {
					//console.dir(result.jsonr.data)
					if (typeof cb == 'function') {
						return cb(null, result.jsonr.data)
					} else {
						return result.jsonr.data
					}
				}
			}
			if (typeof cb == 'function') {
				cb(new Error('请求失败'), null)	
			}
		}).catch(function(err) {
			if (typeof cb == 'function') {
				cb(err, null)
			} else {
				return err
			}
		})
	}
	baseSearch2(params) {
		let data = assign(params, {
			s: 'h5',
			v: '3.3.9',
			src: 'webapp_weixin_mp',
			userId: USERID,
			h5Id: USERID,
			sign: '1',
			cityId: '034',
		})
		return urllib.request('http://web.chelaile.net.cn/api/basesearch/client/clientSearch.action', {
			type: 'GET',
			timeout: 60 * 1000,
			dataAsQueryString: true,
			data: data,
			headers: {
			    Accept: 'application/json, text/plain, */*',
			    'Q-SID': Q_SID,
			    Referer: 'http://web.chelaile.net.cn/ch5/index.html?showFav=1&utm_source=weixinmp&wxckey=CK1298484483775&src=webapp_weixin_mp&s=browser&utm_medium=menu&homePage=linearound&userId=ou7QDj1DSqpAC6m6XB_RlicBav3c&cityId=034&cityVersion=2&supportSubway=1&cityName=%E4%B8%8A%E6%B5%B7',
			    'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
	}
}
// let nearlines = function (params) {
// 	var data = assign(params, {
// 		s: 'h5',
// 		v: '3.3.9',
// 		src: 'webapp_weixin_mp',
// 		userId: USERID,
// 		h5Id: USERID,
// 		sign: '1',
// 	})
// 	/*{
//         //lineId: '021-700-1',
//         lineName: '700',
//         direction: '0',
//         lineNo: '700',
//         cityId: '034',
//         //geo_lat: '31.095802',
//         //geo_lng: '121.38988',
//         //lat: '31.095802',
//         //lng: '121.38988',
//         //gpstype: 'wgs',
//     }*/
//     console.log(HOST + NEARLINES)
// 	urllib
// 		.request(HOST + NEARLINES, {
// 			type: 'GET',
// 			contentType: 'application/json',
// 		    data: data,
// 		    dataAsQueryString: true,
// 		    headers: {
// 		        Accept: 'application/json, text/plain, */*',
// 		        'Q-SID': Q_SID,
// 		        Referer: 'http://web.chelaile.net.cn/ch5/index.html?showFav=1&utm_source=weixinmp&wxckey=CK1298484483775&src=webapp_weixin_mp&s=browser&utm_medium=menu&homePage=linearound&userId=ou7QDj1DSqpAC6m6XB_RlicBav3c&cityId=034&cityVersion=2&supportSubway=1&cityName=%E4%B8%8A%E6%B5%B7',
// 		        'Content-Type': 'application/x-www-form-urlencoded',
// 		    },
// 		})
// 		.then(function(data) {
// 			if (data && data.data) {
// 				let string = data.data.toString()
// 				string = string.replace('**YGKJ', '').replace('YGKJ##', '')

// 				let result = is_json_string(string) && JSON.parse(string)
// 				if (result) {
// 					console.dir(result.jsonr.data)
// 					return result
// 				} 
// 			}
// 			return new Error('请求失败')
// 		})
// 		.catch(function(err){
// 			if (err) {
// 				throw err; // you need to handle error 
// 			}
// 		})
// }

// let lineDetail = function (params) {
// 	var data = assign(params, {
// 		s: 'h5',
// 		v: '3.3.9',
// 		src: 'webapp_weixin_mp',
// 		userId: USERID,
// 		h5Id: USERID,
// 		sign: '1',
// 	})
//     console.log(HOST + LINEDETAIL)
//     console.dir(data)
// 	urllib
// 		.request(HOST + LINEDETAIL, {
// 			type: 'GET',
// 			contentType: 'application/json',
// 		    data: data,
// 		    dataAsQueryString: true,
// 		    headers: {
// 		        Accept: 'application/json, text/plain, */*',
// 		        'Q-SID': Q_SID,
// 		        Referer: 'http://web.chelaile.net.cn/ch5/index.html?showFav=1&utm_source=weixinmp&wxckey=CK1298484483775&src=webapp_weixin_mp&s=browser&utm_medium=menu&homePage=linearound&userId=ou7QDj1DSqpAC6m6XB_RlicBav3c&cityId=034&cityVersion=2&supportSubway=1&cityName=%E4%B8%8A%E6%B5%B7',
// 		        'Content-Type': 'application/x-www-form-urlencoded',
// 		    },
// 		})
// 		.then(function(data) {
// 			if (data && data.data) {
// 				let string = data.data.toString()
// 				string = string.replace('**YGKJ', '').replace('YGKJ##', '')
// 				let result = is_json_string(string) && JSON.parse(string)
// 				if (result) {
// 					//console.dir(result.jsonr.data)
// 					DataAdapter.getInstance().transform('bus', result.jsonr.data)
// 					return result
// 				} 
// 			}
// 			return new Error('请求失败')
// 		})
// 		.catch(function(err){
// 			throw err; // you need to handle error 
// 		})
// }

//export {nearlines, lineDetail}