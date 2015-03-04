var
  Q = require( "q" ),
  $ = require( "jquery" ),
  btoa = require( "btoa" ),

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),

  ActionTypes = KanbanerConstants.ActionTypes;

/**
 * Creates bases authorization token. sends it to github.com.
 * If authorization success, send object with user and token to next promise ,
 * Else send null to next promise
 * @param {string} username
 * @param {string} password
 * @return {object} promise object
 */
var authenticateUser = function( username, password ) {
  var authToken = btoa( username + ":" + password );
  return Q.when($.ajax({
    url: "https://api.github.com/user",
    method: "get",
    headers: {
      "Authorization": "Basic " + authToken
    }
  }) )
    .then(function ( data ) {
      return Q({
        user: data,
        token: authToken
      });
    }, function() {
      return Q( null );
    });
};

var UserActions = {
  /**
   * @param {string} username
   * @param {string} password
   */
  sendAuthCredentials: function(username, password) {
    return authenticateUser(username, password)
      .then(function( data ) {
        if( data ) {
          KanbanerDispatcher.handleViewAction({
            type: ActionTypes.USER_LOGIN_SUCCESS,
            user: data.user,
            token: data.token
          });
          return Q( "succcess" );
        } else {
          KanbanerDispatcher.handleViewAction({
            type: ActionTypes.USER_LOGIN_FAIL
          });
          return Q( "failed" );
        }
      })
  },

  logoutUser: function() {
    return Q.fcall(function() {
      KanbanerDispatcher.handleViewAction({
        type: ActionTypes.USER_LOGOUT
      });
      return "logout";
    });
  }
};

module.exports = UserActions;
