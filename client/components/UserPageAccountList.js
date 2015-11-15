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
      <div>
        <h4>Accounts</h4>

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
