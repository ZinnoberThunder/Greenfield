var OrgPageMember = require('./OrgPageMember');
var React = require('react');

var OrgPageMemberList = React.createClass({

  render: function() {

    return (
      <div className="accounts">
        
        {

          this.props.organization.users.map(function(user){
            return (
              <OrgPageMember key={user.name} name={user.name} accounts={user.accounts} />
            )
          })

        }

      </div>
    );
  }

});

module.exports = OrgPageMemberList;
