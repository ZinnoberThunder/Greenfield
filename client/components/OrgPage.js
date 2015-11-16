var actions = require('../flux/actions');
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
    Because we set up the path on the Route component
    to be 'org/:orgName', the router will pass down the 
    orgName param as a prop to this component when it 
    mounts and renders. We can use this param to then
    fetch the correct org info from the server by calling
    the fetchOrg action.
    */
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
      <div id="orgTitle">
        <img id="profilePic" src="/assets/hr.png"></img>
        <h2>Welcome to {this.state.organization.name}</h2>
        <h2>Members</h2>
        <OrgPageMemberList organization={this.state.organization} />
      </div>
    )
  }
});

module.exports = OrgPage;
