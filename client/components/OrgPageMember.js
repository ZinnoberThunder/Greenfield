var React = require('react');

var OrgPageMember = React.createClass({

  render: function() {

    return (
      <div>
        <div>{this.props.name}: </div>

        {

          this.props.accounts.map(function(account){
            return (
              <div>
                <span key={account.url}>{account.name}: </span>
                <a href={account.url}>Go to link</a>
              </div>
            )
          })

        }

      </div>
    )
  }
  
});

module.exports = OrgPageMember;
