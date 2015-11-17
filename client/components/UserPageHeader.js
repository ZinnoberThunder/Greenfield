var React = require('react');

var UserPageHeader = React.createClass({

// "/assets/profilepic.png"

  render: function() {

    return (
      <div>
        {!this.props.user.accounts[0] && <img id="profilePic" src="/assets/profilepic.png"></img>}
        {this.props.user.accounts[0] && <img id="profilePic" src={this.props.user.accounts[0].imgLink}></img>}
        <h1>{this.props ? this.props.user.username: 'no user in state'}</h1>
        <h3>Your Profile</h3>
      </div>
    )
  }
  
});

module.exports = UserPageHeader;
