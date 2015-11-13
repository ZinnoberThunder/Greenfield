var assign = require('object-assign');
var dispatcher = require('./dispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  user: {
    name: 'kurt',
    accounts: ['facebook', 'linkedin'],
    orgs: ['HR34'],
  },
  organization: {
    name: 'nick org',
    members: [{name: 'nick', accounts: ['facebook', 'linkedin']}]
  }
};

//for testing puposes, may still need this when users add new account
// var updateUser = function(data) {
//   _store.user = data.user;
// };

var loadUser = function(data){
  //update when you figure out the structure of the data
  _store.user = data;
};

var store = assign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getStore: function(){
    return _store;
  }
});

dispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case 'UPDATE_USER':
      updateUser(action.data);
      store.emit(CHANGE_EVENT);
      break;
    case 'LOAD_USER':
      loadUser(action.data);
      store.emit(CHANGE_EVENT);
      break;
    // add case for LOAD_ORG
      // updateOrg in store
    default:
      return true;
  }
});

module.exports = store;
