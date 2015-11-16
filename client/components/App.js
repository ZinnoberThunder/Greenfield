var auth = require('../auth/auth');
var History = require('react-router').History;
var Link = require('react-router').Link;
var React = require('react');

var App = React.createClass({

  mixins: [History],

  /*
  On logout, remove the token from local storage and redirect the
  user to the /login page
  */
  logout: function() {
    auth.removeToken();
    this.history.pushState(null, '/login');
  },

  render: function() {

    /*
    This App component doesn't do much as it is currently written.
    It is being controlled by the Route component at path '/'. Since
    we nested Route components with the '/' Route component, we make sure
    to include {this.props.children} in the render function here. The Router
    will pass in the correct components to this.props.children depending on
    the current url/path
    */
    return (
      <div>
        <button id="logout" onClick={this.logout}>Logout</button>
        {this.props.children}
      </div>
    );
  }
  
});

module.exports = App;
