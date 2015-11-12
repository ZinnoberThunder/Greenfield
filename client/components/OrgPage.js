var React = require('react');
var Link = require('react-router').Link;

var OrgPage = React.createClass({

  render: function() {

    return (
      <div>
        <h1>This is the OrgPage</h1>
        <Link to="/user">Click to go back to UserPage</Link>
      </div>
    )
  }
});

module.exports = OrgPage;