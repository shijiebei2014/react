var React = require('react')

var Toolbar = React.createClass({
	render: function() {
		return 	<div className="toolbar">
				    <div className="toolbar-inner">
				      	<a href="#" className="link">Link 1</a>
				      	<a href="#" className="link">Link 2</a>
				    </div>
				</div>
	}
})

module.exports = Toolbar