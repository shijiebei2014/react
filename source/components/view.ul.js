var React = require('react')

var Button = require('./view.button.js')
var Input = require('./view.input.js')
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
});

Ul.Li = React.createClass({
	render: function() {
		var {media, type, label, text, ...other} = this.props, input = "", labelhtml = ""

		if (label) {
			labelhtml = <div  className="item-title">{label}</div>
		}
		switch(type) {
			case 'text':
				input = <Input.Text {...other}/>
				break;
			case 'button':
				input = <div className="item-input">
                            <Button text={text} {...other}/>
				        </div>
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
});

module.exports = Ul