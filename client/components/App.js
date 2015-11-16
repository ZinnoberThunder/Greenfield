var Link = require('react-router').Link;
var React = require('react');

var App = React.createClass({

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
        <Link to="/">Click to go to UserPage</Link><br/>
        <Link to="/org/hr34">Click to go to OrgPage</Link><br/>
        {this.props.children}
      </div>
    );
  }
  
});

module.exports = App;
