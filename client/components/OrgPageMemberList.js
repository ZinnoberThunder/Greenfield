var OrgPageMember = require('./OrgPageMember');
var React = require('react');

var OrgPageMemberList = React.createClass({

  render: function() {

    return (
      this.props.organization.users.map(function(member){
        return (
          <div className="accounts">
            <OrgPageMember key={member.name} name={member.name} accounts={member.accounts} />
          </div>
        )
      })
    );
  }

});

module.exports = OrgPageMemberList;
