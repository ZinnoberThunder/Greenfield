var dispatcher = require('./dispatcher');
var store = require('./store');

var actions = {

  loadUser: function() {
    dispatcher.handleAction({
      actionType: 'UPDATE_USER',
      data: {
        user: {
          name: 'nick',
          accounts: ['facebook', 'twitter'],
          orgs: ['HR34']
        }
      }
    })
  },

  loadOrg: function(orgName) {
    // send ajax get with org name

    // on success:

    // dispatcher handle action
      // type is LOAD_ORG
      // data is orgInfo from server
  }

};

module.exports = actions;