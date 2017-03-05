var React = require('react')

var Navbar = require('./view.navbar')
var Toolbar = require('./view.toolbar')

var Search = require('./search')
var Line = require('./line')

var View = React.createClass({
	render: function() {
		var classNames = this.props.className.split(' ')
		if (classNames.indexOf('view-main') != -1) {
			return	<div className={this.props.className}>
						<Navbar/>
					  	<div className="pages navbar-through toolbar-through">
					  		<View.Page page="index" is_search="true" className="page"/>
					  		<View.Page page="line" className="page cached"/>
						</div>
					</div>
		} else {
			return <div className={this.props.className}>
						<Page page="detail"/>
				   </div>
		}
	}
});

View.Page = React.createClass({
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

module.exports = View