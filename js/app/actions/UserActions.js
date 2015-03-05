var
  Q = require( "q" ),
  $ = require( "jquery" ),
  btoa = require( "btoa" ),

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),
  LoaderActions = require( "./LoaderActions" ),

  ActionTypes = KanbanerConstants.ActionTypes;

  /**
   * Creates bases authorization token. sends it to github.com.
   * If authorization success, send object with user and token to next promise ,
   * Else send null to next promise
   * @param {string} username
   * @param {string} password
   * @return {object} promise object
   */
  authenticateUser = function( token ) {
    return Q($.ajax({
      url: "https://api.github.com/user",
      method: "get",
      headers: {
        "Authorization": "Basic " + token
      }
    }) )
      .then(function ( data ) {
        return Q({
          user: data,
          token: token
        });
      }, function() {
        return Q( null );
      });
  };

  UserActions = {

    /**
     * Tries to authorize with current token
     * @param token
     * @returns {*}
     */
    checkToken: function( token ){
      return LoaderActions.showLoader()
        .then(function() {
          return authenticateUser( token )
        })
        .then(function( data ) {
          if( data ) {
            KanbanerDispatcher.handleViewAction({
              type: ActionTypes.USER_LOGIN_SUCCESS,
              user: data.user,
              token: data.token
            });
            return Q( "succcess" );
          }

          KanbanerDispatcher.handleViewAction({
            type: ActionTypes.USER_LOGIN_FAIL
          });
          return Q( "failed" );
        })
        .then(LoaderActions.hideLoader);
    },
    /**
     * @param {string} username
     * @param {string} password
     */
    sendAuthCredentials: function(username, password) {
      var token = btoa( username + ":" + password );
      return this.checkToken( token );
    },

    logoutUser: function() {
      KanbanerDispatcher.handleViewAction({
        type: ActionTypes.USER_LOGOUT
      });
      return Q("logout");
    }
  };

module.exports = UserActions;
