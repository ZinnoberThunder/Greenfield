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

  signupUser: function(email, username, password) {

    $.ajax({
      type: "POST",
      url: '/api/login',
      dataType: 'json',
      data: {
        email: email,
        username: username,
        password: password
      },
      error: function(err) {
        // handle error:
          // already user?
          // username already taken?
        console.log(err);
      },
      success: function(res){
        actions.loadUser(res); // what will response look like?
      },
    });

    // actions.loadUser(accInfo);
  },

  loginUser: function(username, password){
    
    if (auth.isLoggedIn()) {
      // already logged in, handle this somehow?
      // maybe with cb?
      // cb(true);
      return;
    }

    $.ajax({
      type: "POST",
      url: '/api/login',
      dataType: 'json',
      data: JSON.stringify(accInfo),
      error: function(err) {
        console.log(err);
      },
      success: function(res){
        actions.loadUser(res.user); // what will response look like?
      }
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
