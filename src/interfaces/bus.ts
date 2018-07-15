import {Core} from './core'
import * as fs from 'fs';
import * as path from 'path';
import * as urllib from 'urllib'
import * as _ from 'underscore'
import {write, read, is_json_string} from '../utils/jsonUtil'
export class Bus implements Core {
	private static instance = null;
	public mapping = {};
	private constructor() {}
	public static getInstance() {
		if (Bus.instance == null) {
			Bus.instance = new Bus()
		}
		return Bus.instance
	}
	lineDetail(params, cb) { //接口实现
		let {name} = params
		let detail = null
		return urllib.request(`http://61.129.57.81:8181/interface/getBase.ashx?sign=&name=${escape(name)}`, {
			type: 'GET',
			dataType: 'text',
			timeout: 30 * 1000,
		}).then((data)=>{
			return data.data
		}).then(function(data) {
      let ret = {}
      const keys = ['end_earlytime', 'end_latetime', 'end_stop', 'line_id', 'line_name', 'start_earlytime', 'start_latetime', 'start_stop']
      ret = keys.reduce(function(memo, k) {
        // "<" + k + ">(\\s+)(.*)(\\s+)</" + k + ">"
        const re = new RegExp(`<${k}>(\\s+)(.*)(\\s+)</${k}>`, 'g')
        const result = re.exec(data)
        if (Array.isArray(result) && result.length > 2) {
          ret[k] = result[2]
        }
        return ret
      }, ret)
      if (ret["line_id"]) {
				detail = ret
        return ret
      }
      throw new Error('查询是失败')
		}).then(function(data) {
			const promises = [1, 0].map((dir) => {
				return urllib.request('http://61.129.57.81:8181/interface/getStopList.ashx?name=' + escape(name) + '&lineid=' + data["line_id"] + '&dir=' + dir, {
					type: 'GET',
					dataType: 'json',
					timeout: 30 * 1000,
				})
			})
			return Promise.all(promises)
    }).then((data)=> {
			if (typeof cb === 'function') {
				cb(null, data.reduce((memo, d, index) => {
					const stops = d.data.data
					memo['lineResults' + index] = {
						direction: (!index) + '',
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
						stops: stops.map((s) => {
							return {
								zdmc: s.name,
								id: s.id,
								order: s.id
							}
						})
					}
					return memo
				}, {}))
			}
    }).catch(function(err) {
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
