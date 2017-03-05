//系统内置
var util = require('util')
//第三方
var React = require('react')
//自定义
var Ul = require('./view.ul.js')

var Action = require('../../action/action')
var LineStore = require('../../store/lineStore')

var Line = React.createClass({
	getInitialState: function() {
	    return {
	    	value: LineStore.get()
	    };
	},
	componentDidMount: function() {
		LineStore.addChangeListener(this.handleChange)
	},
	render: function() {
		var style = {margin: 0},  stops = LineStore.get(), lis = [];
		if (util.isObject(stops) && Object.keys(stops).length > 0) {
			stops = stops.stops
			if (stops.length > 1) {
				var label = stops[0].zdmc + '  --->  ' + stops[stops.length - 1].zdmc
				lis.push(<Ul.Li key="0"  type="" after="调头" label={label} afterClick={this.handleDivert}/>)
				stops.forEach(function(stop) {
					//var media = <i className="icon icon-f7">{stop.id}.</i>;
					var media = `${stop.id}.`;
					var after = <div className="item-after">{stop.zdmc}</div>
					lis.push(<Ul.Li key={stop.id} media={media} type="" after={after} onClick={this.handleQueryStop.bind(this, stop.id)}/>)
				}, this)
			}
		} else {
			lis = []
		}
		
		return	<div className="list-block" style={style}>
					<Ul>
						{lis}
					</Ul>
				</div>
	},
	componentWillUnmount: function() {
		LineStore.removeChangeListener()
	},
	handleChange: function() {
		this.setState({
			value: LineStore.get()
		})
	},
	handleDivert: function() {
		Action.divert()
		this.setState({
			value: LineStore.get()
		})
	},
	handleQueryStop: function(key, e) {
		Action.query_stop(key)
	}
})
module.exports = Line