var React = require('react');
var UserPageAccount = require('./UserPageAccount');

var UserPageAccountList = React.createClass({

  render: function() {

    var accountNodes = this.props.accounts.map(function(account){
      return (
        <UserPageAccount key={account} account={account}/>
      );
    });

    return (
      <div>
        <h4>Accounts</h4>
        {accountNodes}
      </div>
    );
  }

});

module.exports = UserPageAccountList;