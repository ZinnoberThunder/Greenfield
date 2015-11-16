var React = require('react');

var UserPageAccount = React.createClass({

  render: function() {

    return (
      <div>
        {this.props.account}
      </div>
    )
  }
  
});

module.exports = UserPageAccount;
