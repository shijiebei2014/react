//第三方
var React = require('react')
var ReactDOM = require('react-dom')
//自定义
var Action = require('../../action/action')

var Navbar = React.createClass({
	render: function() {
		return 	<div className="navbar">
			    	<div className="navbar-inner">
    		      		<div className="left">
    						<a href="#" className="link" onClick={this.handleBack}>返回</a>
    					</div>
			      		<div className="center sliding">Awesome App</div>
			      		<div className="right">
							<a href="#" className="link icon-only open-panel"><i className="icon icon-bars"></i></a>
						</div>
				    </div>
				</div>
	},
	handleBack: function(e) {
		Action.back()
	}
})

module.exports = Navbar