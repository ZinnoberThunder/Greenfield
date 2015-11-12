var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');
var UserPage = require('./components/UserPage');
var OrgPage = require('./components/OrgPage');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var createHistory = require('history').createHistory;

var history = createHistory();

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="user" component={UserPage} />
      <Route path="org" component={OrgPage} />
    </Route>
  </Router>,
  document.getElementById('app')
);
