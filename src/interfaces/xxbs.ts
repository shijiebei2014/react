import {Core} from './core'
import * as fs from 'fs';
import * as path from 'path';
import * as urllib from 'urllib'
import * as _ from 'underscore'
import {XXBS_HOST as HOST, XXBS_PATH as PATH, XXBS_ONE as ONE, XXBS_TWO as TWO} from '../utils/constants'
import {write, read, is_json_string} from '../utils/jsonUtil'
import {Bus_api} from './bus_api';
export class Xxbs implements Core {
	private static instance = null;
	public mapping = {};
	private constructor() {}
	public static getInstance() {
		if (Xxbs.instance == null) {
			Xxbs.instance = new Xxbs()
		}
		return Xxbs.instance
	}
	lineDetail(params, cb) { //接口实现
		let {name} = params
		console.log(name)
		return urllib.request(`${HOST}${PATH}${ONE}`, {
			type: 'GET',
			//dataType: 'json',
			timeout: 0.1 * 1000,
			dataAsQueryString: true,
			data: {
				"action": 'One',
				"name": name
			}
		}).then((data)=>{
			if (data.data && is_json_string(data.data) && _.isObject(JSON.parse(data.data))) {
				this.mapping[name] = JSON.parse(data.data).line_id
				if (this.mapping[name]) {
					var config = read();
					config[name] = this.mapping[name]
					write(JSON.stringify(config))
				}
				// console.log(`${HOST}${PATH}${TWO}`)
				// console.log({
				// 		"action": 'Two',
				// 		"name": name,
				// 		"lineid": this.mapping[name]
				// 	})
				return urllib.request(`${HOST}${PATH}${TWO}`, {
					type: 'GET',
					dataType: 'json',
					timeout: 60 * 1000,
					dataAsQueryString: true,
					data: {
						"action": 'Two',
						"name": name,
						"lineid": this.mapping[name]
					}
				})
			} else {
				return data.data.toString()
				/*return Bus_api.getInstance().baseSearch2({
					key: name,
				});*/
			}
		}).then(function(data) {
			// console.dir(data)
			if (typeof cb == 'function') {
				cb(null, data)
			} else {
				console.log(data)
				return data;
			}
		}).catch(function(err) {
			console.log(err)
			if (typeof cb == 'function') {
				cb(err, null)
			} else {
				console.log(err)
				return err;
			}
		})
	}

	nearlines() { //接口空实现
	}

	baseSearch() { //接口空实现
	}
}
