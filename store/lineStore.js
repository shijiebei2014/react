//系统内置
var util = require('util')
var event = require('events')
//第三方
var assign = require('object-assign')
//自定义
var ActionType = require('../action/actionType')
var busDispatcher = require('../dispatcher/busDispatcher')

var CHANGE_EVENT = 'change', _lines = {}, _name = '', _direction = true, _lineid = ''
var LineStore = assign({}, event.EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener: function() {
		this.removeListener(CHANGE_EVENT)
	},
	get(name) {
		var line = _lines[name ? name : _name]
		if (!line) {
			return ;
		}
		var keys = Object.keys(line)

		for(var i = 0; i < keys.length; i++) {
			if (line[keys[i]].direction + '' == _direction + '') {
				return line[keys[i]]
			}
		}
	},
	getDirection() {
		return _direction
	}
})

LineStore.dispatchToken = busDispatcher.register(function(action) {
	switch(action.type) {
		case ActionType.SHOW_LINE:
			var name = action.text,
			line = action.line;
			_lines[name] = line
			_name = name

			LineStore.emit(CHANGE_EVENT)
			window.mainView.router.load({
				pageName: 'line'
			})
			break;
		case ActionType.BACK:
			window.mainView.router.back()
			break;
		case ActionType.DIVERT:
			_direction = !_direction
			break;
		case ActionType.QUERY_STOP:
			var stops = LineStore.get()
			var key = action.text
			if (util.isArray(stops.stops) && stops.stops.length > Number(key) && Number(key) > 0) {
				var stop = stops.stops[Number(key) - 1]
				$.get('/search_stop', {
					name: _name,
					direction: _direction + '' == true + '' ? 0 : 1,
					stopid: key,
				}).then(function(data) {
					if (util.isArray(data.cars) && data.cars.length > 0) {
						var info = data.cars[0]
						window.myApp.addNotification({
					        title: 'awesome',
					        message: `${info.terminal}, 还有约${Math.floor(info.time / 60)}分钟`
					    });
					}
					console.log(data)
				}).fail(function(err) {
					window.myApp.alert(err)
				})
				//console.log('stop:', stop)
			}
			break;
	}
})

module.exports = LineStore