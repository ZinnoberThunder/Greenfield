var React = require('react');
var OrgPageMember = require('./OrgPageMember');

var OrgPageMemberList = React.createClass({

  render: function() {

    var memberNodes = this.props.organization.members.map(function(member){
      return (
        <OrgPageMember key={member.name} member={member}/>
      );
    });

    return (
      <div>
        <h4>Members</h4>
        {memberNodes}
      </div>
    );
  }

});

module.exports = OrgPageMemberList;