var assign = require('object-assign');
var constants = require('./constants');
var dispatcher = require('./dispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

/*
This is the private store which holds the application state. 
You can have multiple stores, each which can hold a different 
part of the state and have different components listening to
them and updating their state based on store changes. In this
case, we have only one store which is holding the entirety of
the application's state.
*/
var _store = {
  user: {
    // username: 'kurt',
    // accounts: ['facebook'],
    // orgs: [{name: 'HR34', code: 'hr34'}],
    username: '',
    accounts: [],
    orgs: [],
  },
  organization: {
    // code: 'hr34',
    // name: 'HR34',
    // members: [{name: 'Kurt Weiberth', accounts: [{name: 'facebook', url: 'http://facebook.com/kurtweiberth'}]}]
    code: '',
    name: '',
    users: []
  }
};

/*
Called when the LOAD_USER action is dispatched; it
updates the store's user property with the new user 
data coming through on the payload of the action
*/
var loadUser = function(data){
  _store.user = data;
};

var loadOrg = function(data){
  _store.organization = data;
};

/* 
This is the store that is module.export(ed) at
the bottom of this file. The actual store (_store 
above), is private and is accessed through the 
getStore function. This also sets up the store as
an event emitter to send out events which top-level
components listen to, then update their state with 
the new data in the _store
*/
var store = assign({}, EventEmitter.prototype, {

  /*
  These two methods allow a component to register a
  callback when this event fires. You can make as many
  events as you like, each with their own add and remove
  functions that certain components will call to register
  a callback
  */
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },

  // A getter method for the store
  getStore: function(){
    return _store;
  }
});

/*
Register in order to listen to dispatched actions. 
Then, switch on action.actionType to determine how
to handle the action. Call an appropriate function 
to update the _store accordingly, then emit an event
to notify the components of the change.
*/
dispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case constants.LOAD_USER:
      loadUser(action.data);
      store.emit(CHANGE_EVENT);
      break;
    case constants.LOAD_ORG:
      loadOrg(action.data);
      store.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = store;
