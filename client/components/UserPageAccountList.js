var React = require('react');
var UserPageAccount = require('./UserPageAccount');

var UserPageAccountList = React.createClass({

  // var accountNodes = this.props.accounts.map(function(account){
  //   return (
  //     <UserPageAccount key={account} account={account}/>
  //   );
  // });

  render: function() {

    var accountNodes = this.props.accounts.map(function(account){
      return (
        <UserPageAccount key={account} account={account}/>
      );
    });

    return (
      <div className="accounts">
      <h2 className="accountTitle">Accounts</h2>
            {
              this.props.accounts.length === 0 && <a href="/auth/facebook"><h2 className="fbLogin">Log in with<br/>Facebook</h2></a>
            }
            {
              this.props.accounts.map(function(account){
                return (
                  <div>
                  <img className="account" src="assets/facebook.png"></img>
                  <UserPageAccount key={account} account={account}/>
                  </div>
                )
              })
            }
      </div>
    );
  }

});

module.exports = UserPageAccountList;
