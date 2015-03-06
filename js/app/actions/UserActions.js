var
  Q = require( "q" ),
  btoa = require( "btoa" ),

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),
  LoaderActions = require( "./LoaderActions" ),
  GithubResource = require( "../resources/GithubResource" );

  ActionTypes = KanbanerConstants.ActionTypes,

  UserActions = {

    /**
     * Tries to authorize with current token
     * @param {string} token
     * @return {object}
     */
    checkToken: function( token ){
      return LoaderActions.showLoader()
        .then(function() {
          return GithubResource.authenticateUser( token )
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
