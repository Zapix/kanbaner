var
  Q = require( "q" ),

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),
  GithubResource = require( "../resources/GithubResource" ),
  Logger = require( "../utils/Logger" ),
  logger = new Logger( "CollaboratorActions" ),
  ActionTypes = KanbanerConstants.ActionTypes,

  CollaboratorActions = {
    /**
     * Loads all collaborator for current repository
     * @param token
     * @param repositoryFullName
     */
    getCollaboratorList: function(token, repositoryFullName) {
      var getCollaborators = function() {
        var collaboratorsAccumulator = [];

        var loopFunc = function( page ) {
          logger.debug( "Loop for page:" + page );
          return GithubResource.getRepositoryCollaborators(
            token,
            repositoryFullName,
            page
          )
            .then(function ( result ) {
              logger.debug( "Loop " + page + " result:", result);

              if ( !result ) {
                return Q ( null );
              }

              collaboratorsAccumulator = collaboratorsAccumulator.concat(
                result.data
              );

              if ( result.meta && result.meta.next ) {
                return loopFunc( result.meta.next.page );
              }

              return Q ( null );
            });
        };

        return loopFunc( 1 )
          .then(function() {
            KanbanerDispatcher.handleViewAction({
              type: ActionTypes.COLLABORATORS_LOAD_SUCCESS,
              data: collaboratorsAccumulator
            });
            return Q( collaboratorsAccumulator );
          });
      };

      return getCollaborators();
    },

    /**
     * Send action to clear collaborators
     * retrun {object} Q-object
     */
    clearCollaboratorList: function() {
      KanbanerDispatcher.handleViewAction({
        type: ActionTypes.COLLABORATORS_CLEAR
      });
      return Q( "cleared" );
    }

  };

module.exports = CollaboratorActions;
