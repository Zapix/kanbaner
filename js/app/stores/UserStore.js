var
  assign = require( "object-assign" ),
  EventEmitter = require( "events" ).EventEmitter,

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),

  ActionTypes = KanbanerConstants.ActionTypes,

  USER_STORE_INIT = "user-store-init",
  USER_LOGGED_IN = "user-logged-in",
  USER_LOGGED_OUT = "user-logged-out",
  USER_AUTHENTICATION_FAILED = "user-authentication-failed",

  user = null;
  token = null;

/**
 * Save user and token variables. Emit USER_LOGGED_IN event
 * @param {string} authUser
 * @param {string} authToken
 */
var loginUser = function( authUser, authToken ) {
  user = authUser;
  token = authToken;

  UserStore.emitUserLoggedIn();
};

var sendLoginFailed = function() {
  UserStore.emitAuthenticationFailed();
};

/**
 * Clear user, token variables emit USER_LOGGED_OUT event
 */
var logoutUser = function() {
  user = null;
  token = null;

  UserStore.emitUserLoggedOut();
};

var initUserStore = function() {
  UserStore.emitUserStoreInit();
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
   * @returns {object}
   */
  getUser: function() {
    return user;
  },

  /**
   * Returns token
   * @returns {null|*}
   */
  getToken: function() {
    return token;
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
  },

  /**
   * Add user store init event listener
   * @param {function} callback
   */
  addUserStoreInitListener: function (callback) {
    this.on(USER_STORE_INIT, callback);
  },

  /**
   * Remove user store init event listener
   */
  removeUserStoreInitListener: function(callback) {
    this.removeListener(USER_STORE_INIT, callback);
  },

  /**
   * Send user store init event
   */
  emitUserStoreInit: function() {
    this.emit(USER_STORE_INIT)
  }
});

UserStore.dispatcherToken = KanbanerDispatcher.register(function( payload ) {
  var action = payload.action;

  switch( action.type ) {
    case ActionTypes.APP_INIT:
      initUserStore();
      break;
    case ActionTypes.USER_LOGIN_SUCCESS:
      loginUser( action.user, action.token );
      break;
    case ActionTypes.USER_LOGIN_FAIL:
      sendLoginFailed();
      break;
    case ActionTypes.USER_LOGOUT:
      logoutUser();
      break;
  }
});

module.exports = UserStore;
