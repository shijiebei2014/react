var React = require('react')

var Button = React.createClass({
	render: function() {
		var {text, ...other} = this.props
    	return <a href="#" className="button" {...other}>{text}></a>
	}
});

module.exports = Button