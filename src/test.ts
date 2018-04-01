import * as urlib from 'urllib'
//import {nearlines, lineDetail} from './interfaces/bus_api'
import {Bus_api} from './interfaces/bus_api'
import {Xxbs} from './interfaces/xxbs'
import * as _ from 'underscore'
import {DataAdapter} from './utils/dataadapter'
import * as urllib from 'urllib'
import Line from './models/line'
import { publish } from './utils/rabbitmq'
import {is_json_string} from './utils/jsonUtil'
let xxbs: Xxbs;
xxbs = Xxbs.getInstance()
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
Bus_api.getInstance().baseSearch({
	key: '闵行6路'
}, function(err, content) {
	if (err || !_.isObject(content)) {
		console.log(err || '不合法的json字符串')
	} else {
		console.log(`lineId: ${content.lines[0].lineId}`);
		Bus_api.getInstance().lineDetail({
			lineId: content.lines[0].lineId,
			direction: '2',
			stationName: '沪闵路报春路',
			//nextStationName: '700',
			cityId: '034',
		}, function(err, result) {
			if (err) {
				console.log(err)
			} else {
				console.dir(result, {depth: null})
			}
		})
	}
})

