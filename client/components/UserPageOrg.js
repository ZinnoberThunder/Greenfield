var React = require('react');

var UserPageOrg = React.createClass({

  render: function() {

    return (
      <div>
        {this.props.org}
      </div>
    )
  }
});

module.exports = UserPageOrg;