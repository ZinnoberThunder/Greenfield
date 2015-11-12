var React = require('react');

var User = React.createClass({

  render: function() {

    return (
      <h3 onClick={ this.props.clickProp } style={ {color: this.props.attr1, fontSize: 46} }>Hello World from user!</h3>
    )
  }
});

module.exports = User;