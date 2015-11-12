var React = require('react');
var User = require('./User');

var App = React.createClass({

  handleClick: function() {
    console.log(this.state.color);
    this.setState({
      color: this.state.color === 'red' ? 'blue' : 'red'
    });
  },

  getInitialState: function() {
    return {
      color: 'red'
    }
  },

  render: function() {

    return (
      <div>
        <h1>Hello World! {this.state.color}</h1>
        <div>
          <User attr1={this.state.color} clickProp={this.handleClick} />
        </div>

      </div>
    )
  }
});

module.exports = App;