var React = require('react');

var UserPageOrg = React.createClass({

  /*
  When a user clicks on an org, we call this
  handleClick method. We had passed down a method
  called navToOrg via the navToOrg prop, so we can
  call this passed-down callback to allow it to
  handle the navigation. Generally, you want to keep 
  state and method calls in more top-level components,
  then pass them down as callbacks via props.
  */  
  handleClick: function() {
    this.props.navToOrg(this.props.code);
  },

  render: function() {

    return (
      <div onClick={this.handleClick}>
        {this.props.name}
      </div>
    )
  }
  
});

module.exports = UserPageOrg;
