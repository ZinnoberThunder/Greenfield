var React = require('react');
var Link = require('react-router').Link;
var store = require('../store');
var OrgPageMemberList = require('./OrgPageMemberList');

var OrgPage = React.createClass({

  onStoreChange: function() {
    this.setState({
      organization: store.getStore().organization
    });
  },

  componentDidMount: function() {
    store.addChangeListener(this.onStoreChange);
    actions.fetchOrg(this.props.params.orgName);
  },

  componentWillUnmount: function(){
    store.removeChangeListener(this.onStoreChange);
  },

  getInitialState: function() {
    return {
      organization: store.getStore().organization
    };
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
