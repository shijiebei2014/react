var React = require('react')
var ReactDOM = require('react-dom')

var Li = React.createClass({
	render: function() {
		var {media, type, label, ...other} = this.props, input = "", labelhtml = ""

		if (label) {
			labelhtml = <div className="item-title">{label}</div>
		}
		switch(type) {
			case 'text':
				input = <div className="item-input"><input type="text" {...other}/></div>
				break;
			case 'button':
				input = <div className="item-input"><a href="#" className="button" {...other}>查询</a></div>
				break;
			default:
				if (this.props.after) {
					if (this.props.afterClick) {
						input = <div className="item-after" onClick={this.props.afterClick}>{this.props.after}</div>
					} else {
						input = <div className="item-after">{this.props.after}</div>
					}
				}
				break;
		}

		if (!type && this.props.onClick) {
			return (
				<li onClick={this.props.onClick}>
					<div className="item-content">
						<div className="item-media">{media}</div>
						<div className="item-inner">
							{labelhtml}
						    {input}
						</div>
					</div> 
				</li>
			)
		} else {
			return (
				<li>
					<div className="item-content">
						<div className="item-media">{media}</div>
						<div className="item-inner">
							{labelhtml}
						    {input}
						</div>
					</div> 
				</li>
			)
		}
	}
})

module.exports = Li