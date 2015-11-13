var React = require('react');
var UserPageOrg = require('./UserPageOrg');
var History = require('react-router').History;

var UserPageOrgList = React.createClass({

  mixins: [ History ],

  navToOrg: function(orgName) {
    this.history.pushState(null, '/org/' + orgName);
  },

  render: function() {

    return (
      <div>
        <h4>Organizations!!!</h4>

        {

          this.props.orgs.map(function(org){
            return (
              <UserPageOrg navToOrg={this.navToOrg} key={org.code} name={org.name} code={org.code} />
            )
          }.bind(this))

        }

      </div>
    );

  }
});

module.exports = UserPageOrgList;
