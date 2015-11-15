var Link = require('react-router').Link;
var React = require('react');

var App = React.createClass({

  render: function() {

    return (
      <div>
        <Link to="/">Click to go to UserPage</Link><br/>
        <Link to="/org/hr34">Click to go to OrgPage</Link><br/>
        <Link to="/create">Click to go to CreatePage</Link>
        {this.props.children}
      </div>
    );
  }
  
});

module.exports = App;
