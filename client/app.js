var App = require('./components/App');
var auth = require('./auth/auth');
var createHistory = require('history').createHistory;
var IndexRoute = require('react-router').IndexRoute;
var LoginPage = require('./components/LoginPage');
var OrgPage = require('./components/OrgPage');
var React = require('react');
var ReactDOM = require('react-dom');
var Route = require('react-router').Route;
var Router = require('react-router').Router;
var SignupPage = require('./components/SignupPage');
var UserPage = require('./components/UserPage');

ReactDOM.render(
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={UserPage} onEnter={auth.requireAuth} />
      <Route path="org/:orgName" component={OrgPage}  onEnter={auth.requireAuth} />
      <Route path="signup" component={SignupPage} />
      <Route path="login" component={LoginPage} />
    </Route>
  </Router>,
  document.getElementById('app')
);
