var React = require('react')
var Ul = require('./view.ul.js')

var Action = require('../../action/action')
var SearchStore = require('../../store/searchStore')

var Search = React.createClass({
	getInitialState: function() {
	    return {
	    	value: ''
	    };
	},
	componentDidMount: function() {
		SearchStore.addChangeListener(this.handleChange)
	},
	render: function() {
		var style = {margin: 0}
		return	<div className="list-block" style={style}>
					<Ul>
						<Ul.Li media="" type="text" value={this.state.value} ref="bus_name" placeholder="请输入完整的线路名称，如“933路”、“46路区间" onChange={this.handleChange}/>
						<Ul.Li media="" text="查询" type="button" ref="search" onClick={this.handleSearch}/>
					</Ul>
				</div>
	},
	componentWillUnmount: function() {
		SearchStore.removeChangeListener()
	},
	handleChange: function(e) {
		var value = e.target.value
		SearchStore.value(value)
		this.setState({
			value: SearchStore.value()
		})
	},
	handleSearch: function(e) {
		var text = SearchStore.value();
		if (text == "") {
			return false;
		}
		var regExp = /^\d+(\.\d+)?$/;
		if (regExp.test(text)) {
			text = text + '路';
		}
		$.cookie('LineNo', text, {
			expires: 30
		});
		Action.query_bus(text)
	}
})
module.exports = Search