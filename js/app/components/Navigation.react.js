var React = require('react');

var UserStore = require('../stores/UserStore');
var UserAction = require('../actions/UserActions');
var UserNavigation = require('./UserNavigation.react');

/**
 * Returns user from  UserStore
 * @returns {{user: object}}
 */
var getState = function() {
  return {
    user: UserStore.getUser()
  }
};

var Navigation = React.createClass({
  getInitialState: function() {
    return getState();
  },

  /**
   * Add USER_LOGGED_IN USER_LOGGED_OUT events handler when component mounts
   */
  componentDidMount: function() {
    UserStore.addUserLoggedInListener(this.handleUserEvents);
    UserStore.addUserLoggedOutListener(this.handleUserEvents);
  },

  /**
   * Remove USER_LOGGED_IN USER_LOGGED_OUT events handler when component
   * unmounts
   */
  componentWillUnmount: function() {
    UserStore.removeUserLoggedInListener(this.handleUserEvents);
    UserStore.removeUserLoggedOutListener(this.handleUserEvents);
  },

  /**
   * Render navigation panel
   * @returns {XML}
   */
  render: function() {
    var user = this.state.user;

    var userNavigationSection = '';
    if(user){
      userNavigationSection = (
        <UserNavigation
          user={user}
          onLogoutClicked={this.onLogoutClicked}
        />
      );
    }
    return(
      <nav
        className="top-bar"
        data-topbar
        role="navigation"
        data-options="is_hover: true"
      >
        <ul className="title-area">
          <li className="name">
            <h1><a href="#">Kanbaner</a></h1>
          </li>
          <li className="toggle-topbar menu-icon">
            <a href="#">
              <span>Menu</span>
            </a>
          </li>
        </ul>

        <section className="top-bar-section">
          <ul className="right">
            <li><a href="#">Main</a></li>
            <li><a href="#">About</a></li>
            {userNavigationSection}
          </ul>
        </section>
      </nav>
    )
  },

  /**
   * Handle user logged in/logged out events
   */
  handleUserEvents: function() {
    this.setState(getState());
    $(document).foundation();
  },

  /**
   * Send logout action
   */
  onLogoutClicked: function(e) {
    e.preventDefault();
    UserAction.logoutUser();
  }
});

module.exports = Navigation;
