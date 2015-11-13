var auth = {

  getToken: function() {
    return localStorage.getItem('token');
  },

  storeToken: function(token) {
    localStorage.setItem('token', token);
  },

  removeToken: function() {
    localStorage.removeItem();
  },

  isLoggedIn: function() {
    console.log(auth.getToken());
    return !!auth.getToken();
  },

  requireAuth: function(nextState, replaceState) {
    console.log(auth.isLoggedIn());
    if (!auth.isLoggedIn()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
  }
};

module.exports = auth;
