var fluxDispatcher = require('flux').Dispatcher;
var dispatcher = new fluxDispatcher();

// The dispatcher sends all actions through to 
// the store (see dispatcher.register function
// in store.js). Generally, you don't need to 
// worry about what's going on here
dispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = dispatcher;
