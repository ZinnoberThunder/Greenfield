var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');
var UserPage = require('./components/UserPage');
var SignupPage = require('./components/SignupPage');
var LoginPage = require('./components/LoginPage');
var OrgPage = require('./components/OrgPage');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var createHistory = require('history').createHistory;
var auth = require('./auth');

var history = createHistory();

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="user" component={UserPage}  onEnter={auth.requireAuth} />
      <Route path="org/:orgName" component={OrgPage}  onEnter={auth.requireAuth} />
      <Route path="signup" component={SignupPage} />
      <Route path="login" component={LoginPage} />
    </Route>
  </Router>,
  document.getElementById('app')
);
