var auth = require('./auth');
var dispatcher = require('./dispatcher');
var store = require('./store');
var $ = require('jquery');

var actions = {

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
      data: accInfo,
      success: function(response){
        actions.loadUser(response)
      }
    });
  },

  loginUser: function(accInfo){
    
    // if (auth.isLoggedIn()) {
    //   // already logged in, handle this somehow?
    //   // maybe with cb?
    //   // cb(true);
    //   return;
    // }

    $.ajax({
      type: "POST",
      url: '/api/login',
      data: accInfo,
      success: function(response){
        actions.loadUser(response)
      },
    });

  },

  loadUser: function(user) {
    dispatcher.handleAction({
      actionType: 'LOAD_USER',
      data: user
    });
  }

};

module.exports = actions;
