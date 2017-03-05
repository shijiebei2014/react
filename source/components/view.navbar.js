//第三方
var React = require('react')
//自定义
var Action = require('../../action/action')
var NavStore = require('../../store/navStore')

var Navbar = React.createClass({
	getInitialState() {
		return {
			back_is_show: NavStore.value()
		}
	},
	componentDidMount: function() {
		NavStore.addChangeListener(this.handleChange)
	},
	render: function() {
		var back_is_show = ''
		if (this.state.back_is_show) {
            back_is_show = <a href="#" className="link" onClick={this.handleBack}>返回</a>
		}
		return 	<div className="navbar">
			    	<div className="navbar-inner">
			    	    <div className="left">
			    	        {back_is_show}
			    	    </div>
			      		<div className="center sliding">Awesome App</div>
			      		<div className="right">
							<a href="#" className="link icon-only open-panel"><i className="icon icon-bars"></i></a>
						</div>
				    </div>
				</div>
	},
	componentWillUnmount: function() {
		NavStore.removeChangeListener()
	},
	handleBack: function(e) {
		NavStore.toggle()
		this.setState({
			back_is_show: NavStore.value()
		})
		Action.back()
	},
	handleChange: function() {
		NavStore.toggle()
		this.setState({
			back_is_show: NavStore.value()
		})
	}
})

module.exports = Navbar