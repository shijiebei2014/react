var busDispatcher = require('../dispatcher/busDispatcher')
var ActionType = require('./actionType')

module.exports = {
	query_bus: function(text) {
		busDispatcher.dispatch({
			type: ActionType.QUERY_BUS,
			text: text
		})
	},
	show_line: function(name, line) {
		busDispatcher.dispatch({
			type: ActionType.SHOW_LINE,
			text: name,
			line: line
		})
	},
	back: function() {
		busDispatcher.dispatch({
			type: ActionType.BACK,
		})
	},
	divert: function() {
		busDispatcher.dispatch({
			type: ActionType.DIVERT,
		})
	},
	query_stop: function(key) {
		busDispatcher.dispatch({
			type: ActionType.QUERY_STOP,
			text: key,
		})	
	},
	toggle_back: function() {
	    busDispatcher.dispatch({
			type: ActionType.TOGGLE_BACK,
		})		
	}
}