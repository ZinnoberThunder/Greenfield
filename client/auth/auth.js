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
    return !!auth.getToken();
  },

  requireAuth: function(nextState, replaceState) {
    if (!auth.isLoggedIn()) {
      replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
  }
};

module.exports = auth;
