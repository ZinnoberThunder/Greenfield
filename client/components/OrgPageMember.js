var React = require('react');
var OrgPageMember = React.createClass({

  render: function() {

    return (
      <div>
        {this.props.member.name}: {this.props.member.accounts}
      </div>
    )
  }
});

module.exports = OrgPageMember;