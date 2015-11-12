var React = require('react');
var Link = require('react-router').Link;

var App = React.createClass({

  // handleClick: function() {
  //   console.log(this.state.color);
  //   this.setState({
  //     color: this.state.color === 'red' ? 'blue' : 'red'
  //   });
  // },

  // getInitialState: function() {
  //   return {
  //     color: 'red'
  //   }
  // },

  render: function() {

    return (
      <div>
        <h1>{'Hello World! This is a header! I\'m excited'}</h1>
        <Link to="/user">Click to go to UserPage</Link>
        {this.props.children}
      </div>
    )
  }
});

module.exports = App;