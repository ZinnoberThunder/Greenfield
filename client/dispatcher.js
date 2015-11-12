var fluxDispatcher = require('flux').Dispatcher;
var dispatcher = new fluxDispatcher();

dispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = dispatcher;