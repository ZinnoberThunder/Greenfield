var React = require('react');
var Link = require('react-router').Link;

var App = React.createClass({

  render: function() {

    return (
      <div>
        <Link to="/user">Click to go to UserPage</Link><br/>
        <Link to="/org/yo">Click to go to OrgPage</Link>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;