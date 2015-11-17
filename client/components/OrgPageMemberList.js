var OrgPageMember = require('./OrgPageMember');
var React = require('react');

var OrgPageMemberList = React.createClass({

  render: function() {
    return (
        <div>
      {
          this.props.users.map(function(member){
          return (
            <div className="accounts">
              <OrgPageMember key={member.username} name={member.username} accounts={member.accounts} />
              <img className="asdf" src={member.accounts[0] && member.accounts[0].imgLink}></img>
              <h2 className="username">{member.username}</h2>
              {
                member.accounts.map(function(account){
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
          })
      }
        </div>
    );
  }

});

module.exports = OrgPageMemberList;
