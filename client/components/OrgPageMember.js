var React = require('react');

var OrgPageMember = React.createClass({

  render: function() {

    return (
      <div>
        {this.props.account}
      </div>
    )
  }
  
});

module.exports = OrgPageMember;


// <img className="profPic" src="/assets/profilepic.png"></img>
// <h2 className="username">{this.props.name}</h2>
// {

//   this.props.users.map(function(account){
//     return (
//       <div class="account">
//         <h3 key={account.accounts[0].url}>{account.username}</h3>
//         <a href={account.accounts[0].url}><img className="orgAccount" src="/assets/facebook.png"></img></a>
//       </div>
//     )
//   })
// }