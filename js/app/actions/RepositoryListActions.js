var
  Q = require( "q" ),

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),
  LoaderActions = require( "./LoaderActions" ),
  GithubResource = require( "../resources/GithubResource" ),

  ActionTypes = KanbanerConstants.ActionTypes,

  RepositoryActions = {
    /**
     * Tries to get repositories list. If success send
     * REPOSITORIES_LOAD_SUCCESS action.
     * Else send REPOSITORIES_LOAD_FAIL action.
     * @param {string} token Github access token
     * @return {object} Q object
     */
    requestRepositoryList: function(token) {
      return LoaderActions.showLoader()
        .then(function() {
          return GithubResource.getRepositoryList(token);
        })
        .then(function( data ) {
          if( data ){
            KanbanerDispatcher.handleViewAction({
              type: ActionTypes.REPOSITORIES_LOAD_SUCCESS,
              data: data
            });
            return Q( "success" )
          }

          KanbanerDispatcher.handleViewAction({
            type: ActionTypes.REPOSITORIES_LOAD_FAIL
          });

          return Q( "fail" );
        })
        .then(LoaderActions.hideLoader);
    }
  };

module.exports = RepositoryActions;
