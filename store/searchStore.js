//系统内置
var util = require('util')
var event = require('events')
//第三方
var assign = require('object-assign')
//自定义
var ActionType = require('../action/actionType')
var Action = require('../action/action')
var busDispatcher = require('../dispatcher/busDispatcher')
var LineStore = require('../store/lineStore')

var CHANGE_EVENT = 'change', _value = ''
var SearchStore = assign({}, event.EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener: function() {
		this.removeListener(CHANGE_EVENT)
	},
	value: function(val) {
		if (arguments.length > 0) { //set
 			_value = val
		} else { //get
			return _value
		}
	}
})

SearchStore.dispatchToken = busDispatcher.register(function(action) {
	switch(action.type) {
		case ActionType.QUERY_BUS:
			$.get('/search', {
				name: action.text
			}).then(function(data) {
				if (util.isObject(data)) {
					console.log(data)
					Action.toggle_back()
					Action.show_line(action.text, data)
				} else {
					console.log('error data:', data)
				}
			})
			.catch(function(err) {
				console.log('err:', err)
			})
			break;
	}
})

module.exports = SearchStore