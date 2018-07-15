import {TYPE_XXBS, TYPE_BUS} from './constants'
import * as _ from 'underscore'
import "reflect-metadata";

export class DataAdapter {
	private static instance = null
	private constructor() {}

	public static getInstance() {
		if (!DataAdapter.instance) {
			DataAdapter.instance = new DataAdapter()
		}
		return DataAdapter.instance
	}

	transform(type, origin) {
		let dest = {}, keys

		switch (type) {
			case TYPE_XXBS:
				dest = origin
				keys = {
					come: 'lineResults0',
					back: 'lineResults1'
				}
				for(let key of Object.keys(keys)) {
					dest[key] = dest[keys[key]]
					//Reflect.deleteMetadata("", dest, keys[key])
					delete dest[keys[key]]
				}
				break;
			case TYPE_BUS:
				let {buses, line, stations} = origin
				if (!line || !stations) {
				} else {
					console.dir(stations)
					//获取时间
					let travel = {travelTime: null, pRate: 0}
					if (_.isArray(buses)) {
						for(let bus of buses) {
							let travels = bus.travels
							if (_.isArray(travels)) {
								for (let _travel of travels) {
									if (_travel && _travel.pRate > travel.pRate) {
										travel = _travel
									}
								}
							}
						}
					}
					//获取站点信息
					console.log(line)
					keys = {
						id: 'sId',
						zdmc: 'sn',
					}
					stations.forEach(function(station, index) {
						for(let key of Object.keys(keys)) {
							station[key] = station[keys[key]]
							//Reflect.deleteMetadata("", station, keys[key])
							if (key == 'id') {
								station[key] = index;
							} else {
								delete station[keys[key]]
							}
						}
					})
					dest[line.direction + '' == '1' ? 'lineResults0' : 'lineResults1'] = {
						stops: stations,
						line,
						travel,
						direction: line.direction + '' == '1'
					}
				}
				break;
			default:
				// code...
				break;
		}
		return dest
	}
}
/*
{
	toast: '定位失败，已为您选择上海市中心的车站',
	ads: [],
	nearLines: [{
		distance: -1,
		favsbLines: [],
		lines: [Object],
		sId: '021-8304',
		sType: 0,
		sn: '水城路茅台路',
		sortPolicy: 'modelVersion=0.0.8',
		subwayLines: [],
		tag: '常用'
	}, {
		distance: -1,
		favsbLines: [],
		lines: [Object],
		sId: '021-5725',
		sType: 0,
		sn: '莘庄',
		sortPolicy: 'modelVersion=0.0.8',
		subwayLines: [],
		tag: '常用'
	}, ],
	saveFav: 0
}

{
	lineId: '021-700-1',
	direction: '0',
	cityId: '034',
	s: 'h5',
	v: '3.3.9',
	src: 'webapp_weixin_mp',
	userId: 'ou7QDj1DSqpAC6m6XB_RlicBav3c',
	h5Id: 'ou7QDj1DSqpAC6m6XB_RlicBav3c',
	sign: '1'
} {
	targetOrder: 27,
	toast: '定位失败，请手动选择站点',
	feed: 0,
	depDesc: '',
	buses: [{
		acBus: 0,
		beforeBaseIndex: -1,
		beforeLat: -1,
		beforeLng: -1,
		busBaseIndex: -1,
		busId: '',
		delay: -1,
		distanceToSc: -1,
		lat: -1,
		licence: '',
		link: '',
		lng: -1,
		mTicket: 0,
		order: -1,
		rType: 1,
		shareId: '',
		state: -1,
		syncTime: -1,
		travels: [Object]
	}, {
		acBus: 0,
		beforeBaseIndex: -1,
		beforeLat: -1,
		beforeLng: -1,
		busBaseIndex: -1,
		busId: '',
		delay: -1,
		distanceToSc: -1,
		lat: -1,
		licence: '',
		link: '',
		lng: -1,
		mTicket: 0,
		order: -1,
		rType: 1,
		shareId: '',
		state: -1,
		syncTime: -1,
		travels: [Object]
	}, {
		acBus: 0,
		beforeBaseIndex: -1,
		beforeLat: -1,
		beforeLng: -1,
		busBaseIndex: -1,
		busId: '',
		delay: -1,
		distanceToSc: -1,
		lat: -1,
		licence: '',
		link: '',
		lng: -1,
		mTicket: 0,
		order: -1,
		rType: 1,
		shareId: '',
		state: -1,
		syncTime: -1,
		travels: [Object]
	}],
	line: {
		desc: '',
		direction: 1,
		endSn: '莘松新村',
		firstTime: '06:00',
		lastTime: '22:30',
		lineId: '021-700-1',
		lineNo: '700',
		name: '700',
		price: '2元',
		sortPolicy: 'flpolicy=0',
		startSn: '芙蓉江路仙霞路',
		state: 0,
		stationsNum: 27,
		type: 0,
		version: ''
	},
	roads: [
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		],
		[
			[Object]
		]
	],
	depTable: 0,
	otherlines: [{
		lineId: '021-700-0'
	}],
	fav: 0,
	stations: [{
		distanceToSp: 0,
		metros: [],
		order: 1,
		sId: '021-184',
		sn: '芙蓉江路仙霞路'
	}, {
		distanceToSp: 790,
		metros: [],
		order: 2,
		sId: '021-8304',
		sn: '水城路茅台路'
	}, {
		distanceToSp: 210,
		metros: [],
		order: 3,
		sId: '021-8017',
		sn: '水城路仙霞路'
	}, {
		distanceToSp: 597,
		metros: [Object],
		order: 4,
		sId: '021-7360',
		sn: '水城路虹桥路'
	}, {
		distanceToSp: 1093,
		metros: [],
		order: 5,
		sId: '021-2666',
		sn: '虹许路古羊路'
	}, {
		distanceToSp: 737,
		metros: [],
		order: 6,
		sId: '021-5675',
		sn: '虹许路红松东路'
	}, {
		distanceToSp: 966,
		metros: [],
		order: 7,
		sId: '021-8402',
		sn: '虹许路吴中路'
	}, {
		distanceToSp: 871,
		metros: [Object],
		order: 8,
		sId: '021-3005',
		sn: '虹许路宜山路'
	}, {
		distanceToSp: 620,
		metros: [],
		order: 9,
		sId: '021-8995',
		sn: '古美路宜山路'
	}, {
		distanceToSp: 228,
		metros: [],
		order: 10,
		sId: '021-2088',
		sn: '古美路田林路'
	}, {
		distanceToSp: 454,
		metros: [],
		order: 11,
		sId: '021-6932',
		sn: '古美路田州路'
	}, {
		distanceToSp: 538,
		metros: [],
		order: 12,
		sId: '021-5226',
		sn: '古美路漕宝路'
	}, {
		distanceToSp: 328,
		metros: [],
		order: 13,
		sId: '021-3482',
		sn: '古美路东兰路'
	}, {
		distanceToSp: 710,
		metros: [],
		order: 14,
		sId: '021-3844',
		sn: '古美路古龙路'
	}, {
		distanceToSp: 670,
		metros: [],
		order: 15,
		sId: '021-6595',
		sn: '古美路顾戴路'
	}, {
		distanceToSp: 314,
		metros: [],
		order: 16,
		sId: '021-8981',
		sn: '平阳路古美路'
	}, {
		distanceToSp: 461,
		metros: [],
		order: 17,
		sId: '021-1727',
		sn: '莲花路平阳路'
	}, {
		distanceToSp: 282,
		metros: [],
		order: 18,
		sId: '021-6667',
		sn: '莲花路古美西路'
	}, {
		distanceToSp: 749,
		metros: [Object],
		order: 19,
		sId: '021-8254',
		sn: '莲花路地铁站'
	}, {
		distanceToSp: 949,
		metros: [],
		order: 20,
		sId: '021-2353',
		sn: '沪闵路报春路'
	}, {
		distanceToSp: 1646,
		metros: [],
		order: 21,
		sId: '021-4554',
		sn: '莘庄地铁站北广场'
	}, {
		distanceToSp: 785,
		metros: [],
		order: 22,
		sId: '021-5725',
		sn: '莘庄'
	}, {
		distanceToSp: 441,
		metros: [],
		order: 23,
		sId: '021-11351',
		sn: '莘东路莘谭路'
	}, {
		distanceToSp: 371,
		metros: [],
		order: 24,
		sId: '021-4405',
		sn: '莘沥路莘凌路'
	}, {
		distanceToSp: 538,
		metros: [],
		order: 25,
		sId: '021-5775',
		sn: '莘沥路西环路'
	}, {
		distanceToSp: 504,
		metros: [],
		order: 26,
		sId: '021-365',
		sn: '西环路莘谭路'
	}, {
		distanceToSp: 154,
		metros: [],
		order: 27,
		sId: '021-5768',
		sn: '莘松新村'
	}],
	notify: 0
}
 */

/**
{ lineResults0:
   { direction: 'true',
     stops:
      [ { zdmc: '莘松新村', id: '1' },
        { zdmc: '莘沥路西环路', id: '2' },
        { zdmc: '莘沥路莘凌路', id: '3' },
        { zdmc: '莘东路莘沥路', id: '4' },
        { zdmc: '莘庄', id: '5' },
        { zdmc: '莘庄地铁站北广场', id: '6' },
        { zdmc: '沪闵路报春路', id: '7' },
        { zdmc: '莲花路地铁站', id: '8' },
        { zdmc: '莲花路古美西路', id: '9' },
        { zdmc: '莲花路平阳路', id: '10' },
        { zdmc: '平阳路古美路', id: '11' },
        { zdmc: '古美路顾戴路', id: '12' },
        { zdmc: '古美路古龙路', id: '13' },
        { zdmc: '古美路东兰路', id: '14' },
        { zdmc: '古美路漕宝路', id: '15' },
        { zdmc: '古美路田州路', id: '16' },
        { zdmc: '古美路田林路', id: '17' },
        { zdmc: '古美路宜山路', id: '18' },
        { zdmc: '虹许路宜山路', id: '19' },
        { zdmc: '虹许路吴中路', id: '20' },
        { zdmc: '虹许路红松东路', id: '21' },
        { zdmc: '虹许路古羊路', id: '22' },
        { zdmc: '水城南路虹桥路', id: '23' },
        { zdmc: '水城路仙霞路', id: '24' },
        { zdmc: '芙蓉江路仙霞路', id: '25' } ] },
  lineResults1:
   { direction: 'false',
     stops:
      [ { zdmc: '芙蓉江路仙霞路', id: '1' },
        { zdmc: '水城路茅台路', id: '2' },
        { zdmc: '水城路仙霞路', id: '3' },
        { zdmc: '水城路虹桥路', id: '4' },
        { zdmc: '虹许路古羊路', id: '5' },
        { zdmc: '虹许路红松东路', id: '6' },
        { zdmc: '虹许路吴中路', id: '7' },
        { zdmc: '虹许路宜山路', id: '8' },
        { zdmc: '古美路宜山路', id: '9' },
        { zdmc: '古美路田林路', id: '10' },
        { zdmc: '古美路田州路', id: '11' },
        { zdmc: '古美路漕宝路', id: '12' },
        { zdmc: '古美路东兰路', id: '13' },
        { zdmc: '古美路古龙路', id: '14' },
        { zdmc: '古美路顾戴路', id: '15' },
        { zdmc: '平阳路古美路', id: '16' },
        { zdmc: '莲花路平阳路', id: '17' },
        { zdmc: '莲花路古美西路', id: '18' },
        { zdmc: '莲花路地铁站', id: '19' },
        { zdmc: '沪闵路报春路', id: '20' },
        { zdmc: '莘庄地铁站北广场', id: '21' },
        { zdmc: '莘庄', id: '22' },
        { zdmc: '莘东路莘沥路', id: '23' },
        { zdmc: '莘沥路莘凌路', id: '24' },
        { zdmc: '莘沥路西环路', id: '25' },
        { zdmc: '西环路莘谭路', id: '26' },
        { zdmc: '莘松新村', id: '27' } ] } }
*/