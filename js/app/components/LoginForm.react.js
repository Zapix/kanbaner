var
  React = require( "react" ),
  Router = require( "react-router" ),

  UserActions = require( "../actions/UserActions" ),
  UserStore = require( "../stores/UserStore" );

var LoginForm = React.createClass({
   mixins: [ Router.Navigation, Router.State ],
  /**
   * Initial state for authentication error.
   * @returns {{authenticationFailed: boolean}}
   */
  getInitialState: function() {
    return {authenticationFailed: false};
  },

  /**
   * Add USER_AUTHENTICATION_FAILED, USER_LOGGED_IN event handlers when mount
   * component. Checks is user authenticated
   */
  componentDidMount: function() {
    UserStore.addAuthenticationFailedListener( this.onAuthenticationFailed );
    UserStore.addUserLoggedInListener( this.onUserLoggedIn );
    this.checkUserLogin();
  },

  /**
   * Remove USER_AUTHENTICATION_FAILED, USER_LOGGED_IN event handlers when
   * unmount component
   */
  componentWillUnmount: function() {
    UserStore.removeAuthenticationFailedListener( this.onAuthenticationFailed );
    UserStore.removeUserLoggedInListener( this.onUserLoggedIn )
  },

  /**
   * Send action with user authentication credentials
   * @param {object} e
   */
  handleSubmit: function(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    this.setState({authenticationFailed: false});

    if(username != '' && password != '') {
      UserActions.sendAuthCredentials(username, password);
    }
  },

  /**
   * Gets Login form. Shows error message if authentication failed
   * @returns {XML}
   */
  render: function() {
    var authenticationFailed = this.state.authenticationFailed;

    var errorMessage = '';

    if(authenticationFailed) {
      errorMessage = (
        <div className="row">
          <div className="large-12 medium-12 small-12">
            <div
              data-alert
              className="alert-box warning radius"
            >
              Username or login incorrect
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="row login-form">
        <div className="large-6 large-centered medium-6 medium-centered small-12 columns">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="large-12 medium-12 small-12">
                <h4 className="text-center">
                  Login with github:
                </h4>
              </div>
            </div>
          {errorMessage}
            <div className="row">
              <div className="large-2 medium-2 small-3 columns">
                <label
                  htmlFor="username"
                  className="right inline">
                  Username
                </label>
              </div>
              <div className="large-10 medium-10 small-9 columns">
                <input
                  type="text"
                  id="username"
                  ref="username"
                  placeholder="Github username"
                />
              </div>
            </div>
            <div className="row">
              <div className="large-2 medium-2 small-3 columns">
                <label
                  htmlFor="password"
                  className="right inline"
                >
                  Password
                </label>
              </div>
              <div className="large-10 medium-10 small-9 columns">
                <input
                  type="password"
                  id="password"
                  ref="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div
              className="row"
            >
              <div
                className="large-6 large-centered medium-8 medium-centered small-12 columns"
              >
                <button
                  type="submit"
                  className="button expand"
                >
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  },

  /**
   * Checks if user log in, if yes redirect to main page or to page from
   * transition
   */
  checkUserLogin: function() {
    if( UserStore.isUserLoggedIn() ){
      var nextPath = this.getQuery().nextPath;
      if ( !nextPath ) {
        nextPath = "user-panel";
      }
      this.transitionTo(nextPath);
    }
  },

  /**
   * Handle Authentication fail event Show warning if authentication failed
   */
  onAuthenticationFailed: function() {
    this.setState({authenticationFailed: true});
  },

  /**
   * Handle User logged in event.
   */
  onUserLoggedIn: function() {
    this.checkUserLogin();
  }
});

module.exports = LoginForm;
