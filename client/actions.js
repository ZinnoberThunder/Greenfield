var dispatcher = require('./dispatcher');
var store = require('./store');
var $ = require('jQuery');

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
  },

  signupUser: function(accInfo) {

    // Somewhat guessing on syntax, can't do much testing without db hooked up
    $.ajax({
      type: "POST",
      url: '/api/signup',
      data: JSON.stringify(accInfo),
      success: function(response){
        actions.loadUser(response)
      },
      dataType: 'json'
    });
  },

  loginUser: function(accInfo){
    $.ajax({
      type: "POST",
      url: '/api/login',
      data: JSON.stringify(accInfo),
      success: function(response){
        actions.loadUser(response)
      },
      dataType: 'json'
    });
  },

  loadUser: function(userObj) {
    dispatcher.handleAction({
      actionType: 'LOAD_USER',
      data: userObj
    })
  }

};

module.exports = actions;