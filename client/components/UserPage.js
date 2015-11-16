var actions = require('../flux/actions');
var React = require('react');
var store = require('../flux/store');
var UserPageAccountList = require('./UserPageAccountList');
var UserPageHeader = require('./UserPageHeader');
var UserPageOrgList = require('./UserPageOrgList');

var UserPage = React.createClass({

  onStoreChange: function() {
    /*
    This method is called whenever the store changes.
    So, we grab the user prop from the updated store
    and set it to the state of this component. Whenever
    this happens, React will re-render the entire app,
    so if the user info from the state is being passed
    down to child components via props (it is), they will
    react to it and be updated with the new info
    */
    this.setState({
      user: store.getStore().user
    });
  },

  componentDidMount: function() {
    /*
    This method is called each time the component is
    rendered for the first time on the html page. We
    register the onStoreChange method to fire whenever
    the store emits it's CHANGE_EVENT (see store)
    */
    store.addChangeListener(this.onStoreChange);

    actions.fetchUser();
  },

  componentWillUnmount: function(){
    /*
    This method is called eahc time the component is
    removed from the page. This will happen when the user
    navigates to another Route. We remove our event 
    listening to the store's changes.
    */
    store.removeChangeListener(this.onStoreChange);
  },

  getInitialState: function() {
    /*
    When the component first renders to the page, this 
    method is called. You must return an object, which
    will become the component's initial state.
    */
    return {
      user: store.getStore().user
    };
  },

  render: function() {

    /*
    We are passing down the user info to these child components 
    as props. So, in the UserPageAccountList component, you have
    access to the user's accounts through this.props.accounts.
    Inside the UserPageOrgList, you have access the the orgs via
    this.props.orgs. You can name the prop whatever you like by
    just naming the attribute here in the JSX accordingly.
    */
    return (
      <div>
        <UserPageHeader user={this.state.user} />
        <UserPageAccountList accounts={this.state.user.accounts}/>
        <UserPageOrgList orgs={this.state.user.orgs} />
      </div>
    )
  }
});

module.exports = UserPage;
