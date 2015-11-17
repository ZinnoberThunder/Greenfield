var auth = require('../auth/auth');
var constants = require('./constants');
var dispatcher = require('./dispatcher');
var store = require('./store');
var $ = require('jquery');

var actions = {

  /*
  This signup user action gets the JWT token from
  the server and stores it to local storage. It then
  redirects the user to the home (user) page '/'. When
  we call signupUser from the SignupPage component, we
  pass in the component itself as the second argument.
  This is why we can call caller.history.pushState below.
  We do not load the user info to the store at this point
  since when the UserPage loads (user is redirected to '/'),
  the component will call the fetchUser method on
  componentDidMount. 
  */
  signupUser: function(accInfo, caller) {
    $.ajax({
      type: "POST",
      url: '/api/signup',
      data: accInfo,
      error: function(err) {
        console.log(err);
      },
      success: function(response){
        auth.storeToken(response.token);
        caller.history.pushState(null, '/');
      }
    });
  },

  /*
  Similar to signupUser (above). All we want to do
  here is store the JWT we get from the server and 
  redirect the user to '/'
  */
  loginUser: function(accInfo, caller){
    $.ajax({
      type: "POST",
      url: '/api/login',
      data: accInfo,
      error: function(err) {
        console.log(err);
      },
      success: function(response){
        auth.storeToken(response.token);
        caller.history.pushState(null, '/');
      }
    });

  },

  /*
  This is called after fetchUser returns back the
  user info from the server. This function ultimately
  dispatches the action to the store with the user info
  so that the store can update the user prop. After that,
  the store will emit a CHANGE_EVENT and components that
  are listening to this will fetch the new store and update
  state/passed-down props
  */
  loadUser: function(user) {
    dispatcher.handleAction({
      actionType: constants.LOAD_USER,
      data: user
    });
  },

  /*
  This action is called every time the UserPage component
  (which is at the '/' path) loads. This could happen on
  login/signup redirect, a page refresh, or just going to
  the url in the browser.
  */
  fetchUser: function() {

    var token = auth.getToken();

    $.ajax({
      type: "GET",
      url: '/api/users',
      data: {
        token: token
      },
      error: function(err) {
        console.log(err);
      },
      success: function(res) {
        actions.loadUser(res.user);
      }
    });
  },

  /*
  Similar to fetchUser, but called every time the
  OrgPage component loads
  */
  fetchOrg: function(orgName) {
    $.ajax({
      type: "GET",
      url: '/api/orgs/' + orgName,
      error: function(err) {
        console.log(err);
      },
      success: function(res) {
        console.log(res);
        actions.loadOrg(res);
      }
    });
  },

  /*
  Similar to loadUser; dispatches LOAD_ORG action
  to the store to update the current organization
  */
  loadOrg: function(org) {
    dispatcher.handleAction({
      actionType: constants.LOAD_ORG,
      data: org
    });
  }

};

module.exports = actions;
