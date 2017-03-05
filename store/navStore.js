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

var CHANGE_EVENT = 'change', _back_is_show = ''
var NavStore = assign({}, event.EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener: function() {
		this.removeListener(CHANGE_EVENT)
	},
	toggle: function(val) {
	    _back_is_show = !_back_is_show
	},
	value: function() {
		return _back_is_show
	}
})

NavStore.dispatchToken = busDispatcher.register(function(action) {
	switch(action.type) {
		case ActionType.TOGGLE_BACK:
			NavStore.emit(CHANGE_EVENT)
			break;
	}
})

module.exports = NavStore