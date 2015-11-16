var actions = require('../flux/actions');
var History = require('react-router').History;
var Link = require('react-router').Link;
var React = require('react');

var LoginPage = React.createClass({

  mixins: [ History ],
  
  loginUser: function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var accInfo = {username: username, password: password};
    
    // Passing in this (the component) to the action creator so we 
    // can navigate to the home page upon sign up
    actions.loginUser(accInfo, this);
  },

  render: function() {

    return (
      <div>
        <form id="form">
          <br></br>
          <br></br>
          <h2>Login</h2>
          <br></br>
          <h4>Enter Username: <input id="username" type="text" placeholder="Username"></input></h4>
          <h4>Enter Password: <input id="password" type="text" placeholder="Password"></input></h4>
          <button onClick={this.loginUser}>Click me</button><br/>
          <button><Link to="/signup">Click to sign up</Link></button>
        </form>
      </div>
    )
  }
});

module.exports = LoginPage;
