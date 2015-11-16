var History = require('react-router').History;
var React = require('react');
var UserPageOrg = require('./UserPageOrg');

var UserPageOrgList = React.createClass({

  /*
  This History mixin gives you access to this.history,
  as can be seen in the navToOrg method below. With
  this.history, you can perform HTML5 pushState navigations
  */
  mixins: [ History ],

  /*
  When a user clicks on an org, we navigate to the
  org/:orgName path using pushState
  */
  navToOrg: function(orgName) {
    this.history.pushState(null, '/org/' + orgName);
  },

  render: function() {
    
    /*
    When you want to iterate over an array of items and render
    a component or html for each one, you can map over the elements
    and return JSX-style html. Notice that we put all of this in
    between curly braces. Anything in between curly braces is
    evaluated as plain-old Javascript
    */
    return (
      <div>
        <h4>Organizations</h4>

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
