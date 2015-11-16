var Link = require('react-router').Link;
var OrgPageMemberList = require('./OrgPageMemberList');
var React = require('react');
var store = require('../flux/store');

var OrgPage = React.createClass({

  onStoreChange: function() {
    this.setState({
      organization: store.getStore().organization
    });
  },

  componentDidMount: function() {
    store.addChangeListener(this.onStoreChange);

    /*
    Because we set up the path ont he Route component
    to be 'org/:orgName', the router will pass down the 
    orgName param as a prop to this compnent when it 
    mounts and renders. We can use this param to then
    fetch the correct org info from the server by calling
    the fetchOrg action.
    */
    //actions.fetchOrg(this.props.params.orgName);
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
