var actions = require('../flux/actions');
var React = require('react');

var SignupPage = React.createClass({

  signupUser: function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var accInfo = {email: email, username: username, password: password};
    console.log(accInfo);
    actions.signupUser(accInfo);
  },
  
  render: function() {
    return (
      <div>
        <form>
          <h4>Enter Email: <input id="email" type="text" placeholder="Email"></input></h4>
          <h4>Enter Username: <input id="username" type="text" placeholder="Username"></input></h4>
          <h4>Enter Password: <input id="password" type="text" placeholder="Password"></input></h4>
          <button onClick={this.signupUser}>Click me</button>
        </form>
      </div>
    )
  }
});

module.exports = SignupPage;
