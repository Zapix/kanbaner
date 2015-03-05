var React = require("react");

var UserStore = require('../stores/UserStore');
var LoginForm = require("./LoginForm.react");

/**
 * Gets state
 * @returns {{userLoggedIn: boolean}}
 */
var getState = function() {
  return {
    userLoggedIn: UserStore.isUserLoggedIn()
  };
};

var MainSection = React.createClass({
  /**
   * Gets initial state
   * @returns {{userLoggedIn: boolean}}
   */
  getInitialState: function() {
    return getState();
  },

  /**
   * Add handler for USER_LOGGED_IN USER_LOGGED_OUT events when component
   * mounts
   */
  componentDidMount: function() {
    UserStore.addUserLoggedInListener(this.handleUserEvents);
    UserStore.addUserLoggedOutListener(this.handleUserEvents);
  },

  /**
   * Remove handler for USER_LOGGED USER_LOGGED_OUT events when component
   * unmounts
   */
  componentWillUnmount: function() {
    UserStore.removeUserLoggedInListener(this.handleUserEvents);
    UserStore.removeUserLoggedOutListener(this.handleUserEvents);
  },

  /**
   * Return login form if user isn't authenticated or return logged in page
   * @returns {XML}
   */
  render: function() {
    var userAuthenticated = this.state.userLoggedIn;
    var section = '';
    if(userAuthenticated) {
      section = (
        <div>
          <h4>This is application main page</h4>
        </div>
      );
    }else{
      section = (
        <LoginForm/>
      );
    }
    return (
      <div className="main-section">{section}</div>
    )
  },

  /**
   * Handle user logged in/logged out events
   */
  handleUserEvents: function() {
    this.setState(getState());
  }
});

module.exports = MainSection;
