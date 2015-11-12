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
  }

};

module.exports = actions;