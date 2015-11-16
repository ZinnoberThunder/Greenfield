var React = require('react');

var UserPageHeader = React.createClass({

  render: function() {

    return (
      <div>
        <h1>This is the User Page</h1>
        <div>Current user is: {this.props ? this.props.user.name: 'no user in state'}</div>
      </div>
    )
  }
  
});

module.exports = UserPageHeader;
