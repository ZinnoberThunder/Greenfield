var React = require('react');

var UserPageHeader = React.createClass({

  render: function() {

    return (
      <div>
        <h3>This is the User Page</h3>
        <div onClick={this.props.buttonClicked}> Click to change user</div>
        <div>Current user is: {this.props ? this.props.user.username: 'no state'}</div>
      </div>
    )
  }
});

module.exports = UserPageHeader;