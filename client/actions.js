var dispatcher = require('./dispatcher');
var store = require('./store');

var actions = {

  loadUser: function() {
    dispatcher.handleAction({
      actionType: 'UPDATE_USER',
      data: {
        user: 'nick'
      }
    })
  }

};

module.exports = actions;