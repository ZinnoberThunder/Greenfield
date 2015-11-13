var React = require('react');
var actions = require('../actions');
var LoginPage = React.createClass({

  loginUser: function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var accInfo = {username: username, password: password};
    console.log(accInfo)
    actions.loginUser(accInfo);
  },

  render: function() {

    return (
      <div>
        <form id="form">
          <h4>Enter Username: <input id="username" type="text" placeholder="Username"></input></h4>
          <h4>Enter Password: <input id="password" type="text" placeholder="Password"></input></h4>
          <button onClick={this.loginUser}>Click me</button>
        </form>
      </div>
    )
  }
});

module.exports = LoginPage;