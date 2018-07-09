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
		return urllib.request(`http://61.129.57.81:8181/interface/getBase.ashx?sign=&name=${escape(name + '路')}`, {
			type: 'GET',
      // Referer: 'http://61.129.57.81:8181/BusEstimate.aspx',
			dataType: 'text',
			timeout: 60 * 1000,
			// dataAsQueryString: true,
			// data: {
			// 	"sign": '',
			// 	"name": escape(name + '路')
			// }
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
        return ret
      }
      return null
		}).then(function(data) {
      return urllib.request(`http://61.129.57.81:8181/interface/getStopList.ashx?dir=0&lineid=${data.line_id}&name=${escape(name + '路')}`, {
  			type: 'GET',
  			dataType: 'json',
  			timeout: 60 * 1000,
  		})
    }).then((data)=> {
      console.log(data.data.data)
    }).catch(function(err) {
      console.log('err:', err)
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
