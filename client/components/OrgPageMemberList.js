var OrgPageMember = require('./OrgPageMember');
var React = require('react');

var OrgPageMemberList = React.createClass({

  render: function() {

    return (
      <div>
        <h4>Members</h4>
        
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
