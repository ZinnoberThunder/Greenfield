var React = require('react');
var Link = require('react-router').Link;
var actions = require('../actions');
var store = require('../store');

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
        <h1>This is the UserPage</h1>
        <Link to="/org">Click to go back to OrgPage</Link>
        <div onClick={this.buttonClicked}> Click to change user</div>
        <div>Current user is: {this.state ? this.state.user: 'no state'}</div>
      </div>
    )
  }
});

module.exports = UserPage;