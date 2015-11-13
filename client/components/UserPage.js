var React = require('react');
var actions = require('../actions');
var store = require('../store');
var UserPageHeader = require('./UserPageHeader');
var UserPageAccountList = require('./UserPageAccountList');
var UserPageOrgList = require('./UserPageOrgList');

var UserPage = React.createClass({

  onStoreChange: function() {
    this.setState({
      user: store.getStore().user
    });
  },

  componentDidMount: function() {
    store.addChangeListener(this.onStoreChange);
  },

  componentWillUnmount: function(){
    store.removeChangeListener(this.onStoreChange);
  },

  getInitialState: function() {
    return {
      user: store.getStore().user
    };
  },

  render: function() {

    return (
      <div>
        <UserPageHeader user={this.state.user} />
        <UserPageAccountList accounts={this.state.user.accounts}/>
        <UserPageOrgList orgs={this.state.user.orgs} />
      </div>
    )
  }
});

module.exports = UserPage;
