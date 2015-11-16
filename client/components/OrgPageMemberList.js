var OrgPageMember = require('./OrgPageMember');
var React = require('react');

var OrgPageMemberList = React.createClass({

  render: function() {

    return (
      <div className="accounts">
        
        {

          this.props.organization.members.map(function(member){
            return (
              <OrgPageMember key={member.name} name={member.name} accounts={member.accounts} />
            )
          })

        }

      </div>
    );
  }

});

module.exports = OrgPageMemberList;
