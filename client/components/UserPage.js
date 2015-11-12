var React = require('react');
var actions = require('../actions');
var store = require('../store');
var UserPageHeader = require('./UserPageHeader');
var UserPageAccountList = require('./UserPageAccountList');
var UserPageOrgList = require('./UserPageOrgList');

var UserPage = React.createClass({

  updateUser: function() {
    this.setState({
      user: store.getStore().user
    });
  },

  buttonClicked: function() {
    actions.loadUser();
  },

  componentDidMount: function() {
    store.addChangeListener(this.updateUser);
  },

  componentWillUnmount: function(){
    store.removeChangeListener(this.updateUser);
  },

  getInitialState: function() {
    return {
      user: store.getStore().user
    }
  },

  render: function() {

    return (
      <div>
        <UserPageHeader user={this.state.user} buttonClicked={this.buttonClicked}/>
        <UserPageAccountList accounts={this.state.user.accounts}/>
        <UserPageOrgList orgs={this.state.user.orgs}/>
      </div>
    )
  }
});

module.exports = UserPage;