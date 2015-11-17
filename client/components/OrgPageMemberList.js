var OrgPageMember = require('./OrgPageMember');
var React = require('react');

var OrgPageMemberList = React.createClass({

  render: function() {

    return (
        <div>
      {
          this.props.organization.users.map(function(member){
          return (
            <div className="accounts">
              <OrgPageMember key={member.username} name={member.username} accounts={member.accounts} />
            </div>
          )
          })
      }
        </div>
    );
  }

});

module.exports = OrgPageMemberList;
