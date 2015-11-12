var React = require('react');
var Link = require('react-router').Link;

var UserPage = React.createClass({

  render: function() {

    return (
      <div>
        <h1>This is the UserPage</h1>
        <Link to="/org">Click to go back to OrgPage</Link>
      </div>
    )
  }
});

module.exports = UserPage;