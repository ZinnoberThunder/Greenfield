var React = require('react');
var Link = require('react-router').Link;
var UserPageOrg = require('./UserPageOrg')

var UserPageOrgList = React.createClass({

  render: function() {

    var orgNodes = this.props.orgs.map(function(org){
      return (
        <UserPageOrg key={org} org={org}/>
      );
    });

    return (
      <div>
        <h4>Organization</h4>
        {orgNodes}
      </div>
    );

  }
});

module.exports = UserPageOrgList;