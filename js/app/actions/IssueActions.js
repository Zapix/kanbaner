var
  Q = require( "q" ),

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),
  LoaderActions = require( "./LoaderActions" ),
  GithubResource = require( "../resources/GithubResource" ),
  Logger = require( "../utils/Logger" ),
  logger = new Logger( "IssueActions" ),
  ActionTypes = KanbanerConstants.ActionTypes,

  IssueActions = {
    /**
     * Loads all opened issues and one page of closed issues
     * @param token
     * @param repositoryFullName
     * @returns {Object} Q-object with status of Action: 'success' or 'fail'
     */
    getIssueList: function(token, repositoryFullName) {
      var getAllOpenIssues = function () {
        var issuesAccumulator = [];

        var
          loopFunc = function(page, data) {
            logger.debug( "Loop for page: " + page );
            return GithubResource.getRepositoryIssues(
              token,
              repositoryFullName,
              'open',
              page
            )
              .then(function ( result ) {
                logger.debug( "Loop " + page + " result:", result);
                issuesAccumulator = issuesAccumulator.concat( result.data );

                if ( result.meta && result.meta.next ) {
                  return loopFunc( result.meta.next.page );
                }
                return Q( null );
              });
          };

        return loopFunc( 1 )
          .then(function() {
            KanbanerDispatcher.handleViewAction({
              type: ActionTypes.ISSUES_LOAD_SUCCESS,
              data: issuesAccumulator
            });
            return Q( issuesAccumulator );
          });
      };

      //return Q.allSettled([
      //  getAllOpenIssues(),
      //  GithubResource.getRepositoryIssues(
      //    token,
      //    repositoryFullName,
      //    'closed',
      //    1
      //  ).then(function( result ) {
      //      logger.debug( "Closed issues:" );
      //      logger.debug( result );
      //      KanbanerDispatcher.handleViewAction({
      //        type: ActionTypes.ISSUES_LOAD_SUCCESS,
      //        data: result.data
      //      });
      //      return Q( result );
      //    })
      //]);

      return getAllOpenIssues()
        .then(function() {
          logger.debug( "Get closed issues" );
          return GithubResource.getRepositoryIssues(
            token,
            repositoryFullName,
            'closed',
            1
          )
            .then(function( result ) {
              KanbanerDispatcher.handleViewAction({
                type: ActionTypes.ISSUES_LOAD_SUCCESS,
                data: result.data
              });
              return Q( result );
          });
        });
    },

    clearIssues: function() {
      KanbanerDispatcher.handleViewAction({
        type: ActionTypes.ISSUES_CLEAR
      });
      return Q( null );
    }
  };

module.exports = IssueActions;