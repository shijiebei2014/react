var React = require('react')
var ReactDOM = require('react-dom')

var Ul = React.createClass({
	render: function() {
		var style = {
			margin: 0
		}
		if (this.props.style) {
			style = this.props.style
		}
		return (
			<ul style={style}>{this.props.children}</ul>
		)
	}
})

module.exports = Ul