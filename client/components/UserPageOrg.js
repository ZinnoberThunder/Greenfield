var React = require('react');

var UserPageOrg = React.createClass({

  handleClick: function() {
    this.props.navToOrg(this.props.code);
  },

  render: function() {

    return (
      <div onClick={this.handleClick}>
        {this.props.name}
      </div>
    )
  }
});

module.exports = UserPageOrg;
