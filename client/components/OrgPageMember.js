var React = require('react');

var OrgPageMember = React.createClass({

  render: function() {

    return (
      <div>
        <img className="profPic" src="/assets/profilepic.png"></img>
        <h2 className="username">{this.props.name}</h2>

        {

          this.props.accounts.map(function(account){
            return (
              <div class="account">
                <h3 key={account.url}>{account.name}</h3>
                <a href={account.url}><img className="orgAccount" src="/assets/facebook.png"></img></a>
              </div>
            )
          })
        }
      </div>
    )
  }
  
});

module.exports = OrgPageMember;
