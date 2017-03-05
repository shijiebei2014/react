var React = require('react')

var Text = React.createClass({
	render: function() {
        return  <div className="item-input">
        	        <input type="text" {...this.props}/>
                </div>
	}
});

module.exports = {Text}
