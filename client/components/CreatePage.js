var React = require('react');
var actions = require('../actions');

var CreatePage = React.createClass({

  createOrg: function(event) {
    event.preventDefault();
    var orgName = document.getElementById("orgName").value;
    actions.createOrg(orgName);
  },
  
  render: function() {
    return (
      <div>
        <form>
          <h4>Enter organization name: <input id="orgName" type="text" placeholder="Organization name"></input></h4>
        
          <button onClick={this.signupUser}>Add organization</button>
        </form>
      </div>
    )
  }
});

module.exports = CreatePage;
