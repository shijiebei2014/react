var react_devtools = require('react-devtools')
var React = require('react')
var ReactDOM = require('react-dom')
//components
var View = require('./view')
//framework7
window.myApp = null, window.mainView = null;

var Aplication = React.createClass({
	render: function() {
		return (
			<View className="view view-main"/>
		)
	},
	componentDidMount: function() { //初始化framework7
		myApp = new Framework7();

		mainView = myApp.addView('.view-main', {
			modalTitle: 'react',
			modalButtonOk: '确定',
			modalButtonCancel: '取消',
			// Because we want to use dynamic navbar, we need to enable it for this view:
			dynamicNavbar: true,
			domCache: true,
			onPageInit: function(app, page) {
				if (page.pageName = 'line') {
					console.log('line')
				}
			},
		});
	}
})

module.exports = Aplication




