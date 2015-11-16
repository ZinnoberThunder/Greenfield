var React = require('react');

var UserPageHeader = React.createClass({

  render: function() {

    return (
      <div>
        <img id="profilePic" src="/assets/profilepic.png"></img>
        <h1>{this.props ? this.props.user.username: 'no user in state'}</h1>
        <h3>Your Profile</h3>
      </div>
    )
  }
  
});

module.exports = UserPageHeader;
