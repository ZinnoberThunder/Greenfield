var React = require('react');
var Link = require('react-router').Link;
var store = require('../store');
var OrgPageMemberList = require('./OrgPageMemberList');



var OrgPage = React.createClass({

  componentDidMount: function() {
    // pull out this.props.params.orgName

    // call action loadOrg
  },

  getInitialState: function() {
    return {
      organization: store.getStore().organization
    }
  },

  render: function() {

    return (
      <div>
        <h3>This is the OrgPage for {this.state.organization.name}</h3>
        <OrgPageMemberList organization={this.state.organization} />
      </div>
    )
  }
});

module.exports = OrgPage;