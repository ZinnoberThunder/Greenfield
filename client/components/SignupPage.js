var React = require('react');
var SignupPage = React.createClass({

  render: function() {

    return (
      <div>
        <form>
          <h4>Enter Email: <input type="text" placeholder="Email"></input></h4>
          <h4>Enter Username: <input type="text" placeholder="Username"></input></h4>
          <h4>Enter Password: <input type="text" placeholder="Password"></input></h4>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
});

module.exports = SignupPage;