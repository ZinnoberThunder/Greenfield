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
                <h2 key={account.url}>{account.name}: </h2><
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
