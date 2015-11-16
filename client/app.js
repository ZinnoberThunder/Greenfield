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

/*
This app.js is the entry point to our app. The render function renders the components
to the DOM via the element passed in as the second parameter. The first parameter is 
in JSX syntax, which will be found in the render method for each component in this app.
JSX allows you to write HTML-like syntax within your Javascript. The babelify/browserify
build step will compile the JSX into Javascript.

Here we have a Router component as our top-level component. The router will help client-side
navigation. The history attribute is important, as it will allow the Router to keep track and
change the url as navigation progresses through the app. If the user refreshes the page (e.g.
with a url like /org/hr34), our server will just serve the index.html. This will reload the app
like normally, and the Router (it's history prop) will know what the url is, and render the 
correct components based on the Route components we define here within it. 

The :orgName param in the '/org/:orgName' allows you to pull out the param of orgName from the
url so that we know which organization info to load when we render the OrgPage component. The 
Router will pull out the param and pass it down to the component as a prop. So, for instance, if
the user navigates to /org/hr34, the OrgPage component will render and have a
this.props.params.orgName property that will be hr34. 
*/
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
