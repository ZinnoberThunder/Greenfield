var auth = require('../auth/auth');
var constants = require('./constants');
var dispatcher = require('./dispatcher');
var store = require('./store');
var $ = require('jquery');

var actions = {

  signupUser: function(accInfo) {
    $.ajax({
      type: "POST",
      url: '/api/signup',
      data: accInfo,
      error: function(err) {
        console.log(err);
      },
      success: function(response){
        actions.loadUser(response.user);
        auth.storeToken(response.token);
      }
    });
  },

  loginUser: function(accInfo){
    $.ajax({
      type: "POST",
      url: '/api/login',
      data: accInfo,

      success: function(response){
        actions.loadUser(response.user)
      }
    });

  },

  loadUser: function(user) {
    dispatcher.handleAction({
      actionType: constants.LOAD_USER,
      data: user
    });

    // nav to homepage
  },

  fetchUser: function() {
    $.ajax({
      type: "GET",
      url: '/api/user',
      error: function(err) {
        console.log(err);
      },
      success: function(res) {
        actions.loadUser(res.user);
      }
    });
  },

  fetchOrg: function() {
    $.ajax({
      type: "GET",
      url: '/api/org',
      error: function(err) {
        console.log(err);
      },
      success: function(res) {
        actions.loadOrg(res.org);
      }
    });
  },

  loadOrg: function(org) {
    dispatcher.handleAction({
      actionType: 'LOAD_ORG',
      data: org
    });
  }

};

module.exports = actions;
