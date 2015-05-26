var
  Q = require( "q" ),

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),
  LoaderActions = require( "./LoaderActions" ),
  InternalMessageActions = require( "./InternalMessageActions" ),
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
          loopFunc = function(page) {
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

    /**
     * Clear all issues
     * @returns {*}
     */
    clearIssues: function() {
      KanbanerDispatcher.handleViewAction({
        type: ActionTypes.ISSUES_CLEAR
      });
      return Q( null );
    },

    /**
     * Send action that creating new issue has been started.
     * Send request to github with data of new issue.
     * Handle response from github.
     * If issue has been  created(201) send action ISSUE_CREATE_SUCCESS
     * with data of new issue.
     * If issue has got errors(422) then send action ISSUE_CREATE_FAIL
     * with list of errors for this issue
     * If github return another error then send action ISSUE_CREATE_ERROR
     * Returns Q-object with info about request result
     * @param {string} token
     * @param {string} repositoryFullName
     * @param {*} newIssueData
     * @returns {*}
     */
    createIssue: function( token, repositoryFullName, newIssueData ) {
      KanbanerDispatcher.handleViewAction({
        type: ActionTypes.ISSUE_CREATE_START
      });

      return GithubResource.createIssue(
        token,
        repositoryFullName,
        newIssueData
      ).then(function( result ) {
          if( result.status == 201 ) {
            KanbanerDispatcher.handleViewAction({
              type: ActionTypes.ISSUE_CREATE_SUCCESS,
              data: result.data
            });
            InternalMessageActions.sendMessage(
              "New issue has been created",
              "success"
            );
          } else if ( result.status == 422 ) {
            KanbanerDispatcher.handleViewAction({
              type: ActionTypes.ISSUE_CREATE_FAIL,
              data: result.data
            });
          } else {
            KanbanerDispatcher.handleViewAction({
              type: ActionTypes.ISSUE_CREATE_ERROR
            });
          }

          return Q( result );
        });
    },

    /**
     * Clear info about last issue create attempt.
     * Sends ISSUE_CREATE_CLER action.
     * Return Q-object
     * @returns {*}
     */
    issueCreateClear: function() {
      KanbanerDispatcher.handleViewAction({
        type: ActionTypes.ISSUE_CREATE_CLEAR
      });

      return Q( null );
    }
  };

module.exports = IssueActions;