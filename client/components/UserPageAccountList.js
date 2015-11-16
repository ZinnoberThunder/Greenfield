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
        <img className="account" src="assets/facebook.png"></img>
            {
              this.props.accounts.map(function(account){
                return (
                  <UserPageAccount key={account} account={account}/>
                )
              })
            }
      </div>
    );
  }

});

module.exports = UserPageAccountList;
