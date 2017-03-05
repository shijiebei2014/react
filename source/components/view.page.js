var React = require('react')
var ReactDOM = require('react-dom')

var Search = require('./search')
var Line = require('./line')
var Page = React.createClass({
	render: function() {
		return 	(
			<div data-page={this.props.page} className={this.props.className}>
				<div className="page-content">
					{this.props.is_search ? <Search/> : <Line/>}
				</div>
			</div>
		)
	}
})

module.exports = Page