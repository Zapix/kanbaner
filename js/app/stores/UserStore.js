var
  $ = require( "jquery" ),
  btoa = require( "btoa" ),
  assign = require( "object-assign" ),
  EventEmitter = require( "events" ).EventEmitter,

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),

  ActionTypes = KanbanerConstants.ActionTypes,

  USER_LOGGED_IN = "user-logged-in",
  USER_LOGGED_OUT = "user-logged-out",
  USER_AUTHENTICATION_FAILED = "user-authentication-failed",

  user = null,
  token = null;

/**
 * Tries to authenticate user with login/password
 * @param {string} username
 * @param {password} password
 */
var authenticateUser = function( username, password ) {
  var authToken = btoa( username + ":" + password );

  $.when( $.ajax( {
    url: "https://api.github.com/user",
    method: "get",
    headers: {
      "Authorization": "Basic " + authToken
    }
  } ) )
    .then(function( data, status, jqXHR ) {
      if ( jqXHR.status == 200) {
        user = data;
        token = authToken;
        UserStore.emitUserLoggedIn();
      } else {
        UserStore.emitAuthenticationFailed();
      }
    });
};

/**
 * Clear user, token variables emit USER_LOGGED_OUT event
 */
var logoutUser = function() {
  user = null;
  token = null;
  UserStore.emitUserLoggedOut();
};

var UserStore = assign({}, EventEmitter.prototype, {
  /**
   * Returns is user logged in or not
   * @returns {boolean}
   */
  isUserLoggedIn: function() {
    return ( user ) ? true : false;
  },

  /**
   * Returns user
   */
  getUser: function() {
    return user;
  },

  /**
   * Add listener for user logged in event
   * @param {function} callback
   */
  addUserLoggedInListener: function( callback ) {
    this.on( USER_LOGGED_IN, callback );
  },

  /**
   * Remove listener for user logged out event
   * @param {function} callback
   */
  removeUserLoggedInListener: function( callback ) {
    this.removeListener( USER_LOGGED_IN, callback );
  },

  /**
   * User logged in event;
   */
  emitUserLoggedIn: function() {
    this.emit(USER_LOGGED_IN);
  },

  /**
   * Add callback for user logged out event
   * @param {function} callback
   */
  addUserLoggedOutListener: function(callback) {
    this.on(USER_LOGGED_OUT, callback)
  },

  /**
   * Remove callback for user logged out event
   * @param {function} callback
   */
  removeUserLoggedOutListener: function(callback) {
    this.removeListener(USER_LOGGED_OUT, callback)
  },

  /**
   * User logged out event
   */
  emitUserLoggedOut: function() {
    this.emit(USER_LOGGED_OUT);
  },

  /**
   * Add authentication failed event listener
   * @param {function} callback
   */
  addAuthenticationFailedListener: function(callback) {
    this.on(USER_AUTHENTICATION_FAILED, callback);
  },

  /**
   * Remove authentaction failed event listener
   * @param {function} callback
   */
  removeAuthenticationFailedListener: function(callback) {
    this.removeListener(USER_AUTHENTICATION_FAILED, callback);
  },

  /**
   * Send authentication failed event
   */
  emitAuthenticationFailed: function() {
    this.emit(USER_AUTHENTICATION_FAILED);
  }
});

UserStore.dispatcherToken = KanbanerDispatcher.register(function(payload) {
  var action = payload.action;

  console.log(action.type);
  switch( action.type ) {
    case ActionTypes.SEND_AUTHENTICATION_CREDENTIALS:
      console.log( "Send auth credentials" );
      authenticateUser( action.username, action.password );
      break;
    case ActionTypes.USER_LOGOUT:
      console.log( "Logout user" );
      logoutUser();
      break;
  }
});

module.exports = UserStore;
