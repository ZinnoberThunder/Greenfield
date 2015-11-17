var actions = require('../flux/actions');
var History = require('react-router').History;
var React = require('react');

var SignupPage = React.createClass({

  mixins: [History],

  signupUser: function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var accInfo = {email: email, username: username, password: password};

    // Passing in this (the component) to the action creator so we 
    // can navigate to the home page from actions
    actions.signupUser(accInfo, this);
  },
  
  render: function() {
    return (
      <div id="form">
        <form>
          <br></br>
          <br></br>
          <h2>Signup</h2>
          <br></br>
          <h4>Enter Email: <input id="email" type="text" placeholder="Email"></input></h4>
          <h4>Enter Username: <input id="username" type="text" placeholder="Username"></input></h4>
          <h4>Enter Password: <input id="password" type="text" placeholder="Password"></input></h4>
          <br></br>
          <button onClick={this.signupUser}>Click me</button>
        </form>
      </div>
    )
  }
});

module.exports = SignupPage;
