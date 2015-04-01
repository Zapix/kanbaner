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
        .then( LoaderActions.hideLoader );
    },

    /**
     * Tries to get repository details.
     * Checks loaded repositories if it has ben loaded set it as selected.
     * If not loaded tries to get if from githbug.
     * @param {string} token
     * @param {string} repositoryFullName
     * @param {Array} loadedRepositories
     * @returns {*}
     */
    requestRepositoryDetail: function(token, repositoryFullName,
                                      loadedRepositories) {
      return LoaderActions.showLoader()
        .then(function() {
          var
            selectedRepositoryList = loadedRepositories.filter(function(item) {
              var
                itemName = item.full_name.toLowerCase();
              return itemName == repositoryFullName.toLowerCase()
            });

          if ( selectedRepositoryList.length > 0 ) {

            return Q( selectedRepositoryList[0] );
          }

          return GithubResource.getRepositoryDetail(
            token,
            repositoryFullName
          );
        })
        .then( function( data ) {
          if ( data ) {
            KanbanerDispatcher.handleViewAction({
              type: ActionTypes.REPOSITORY_SELECT_SUCCESS,
              data: data
            });
            return Q( "success" );
          }

          KanbanerDispatcher.handleViewAction({
            type: ActionTypes.REPOSITORY_SELECT_FAIL
          });

          return Q( "fail" );
        } )
        .then( function( data ) {
          console.log( "[RepositoryActions]", data );
          return Q( data )
        } )
        .then( LoaderActions.hideLoader );
    }
  };

module.exports = RepositoryActions;
