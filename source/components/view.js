var React = require('react')
var ReactDOM = require('react-dom')

var Navbar = require('./view.navbar')
var Toolbar = require('./view.toolbar')
var Page = require('./view.page')
var View = React.createClass({
	render: function() {
		var classNames = this.props.className.split(' ')

		if (classNames.indexOf('view-main') != -1) {
			return	<div className={this.props.className}>
						<Navbar/>
					  	<div className="pages navbar-through toolbar-through">
					  		<Page page="index" is_search="true" className="page"/>
					  		<Page page="line" className="page cached"/>
						</div>
					</div>
		} else {
			return <div className={this.props.className}>
						<Page page="detail"/>
				   </div>
		}
	}
})

module.exports = View