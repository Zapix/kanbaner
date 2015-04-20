var
  Q = require( "q" ),
  $ = require( "jquery" ),
  parseLinkHeader = require( "parse-link-header" ),

  Logger = require( "../utils/Logger" ),
  logger = new Logger( "GithubResource" ),

  GithubResource = {

    /**
     * Sends request to url with authorization token.
     * Returns Q object
     * @param {string} url The url to send request
     * @param {string} token Token for authorization.
     * @param {string} type Type of request if type not set user get
     * @param {object} data Data for request. Could be null
     * @param {boolean} returnXhr Return xhr object regardless success/failure.
     * Default: false
     */
    sendRequest: function(url, token, type, data, returnXhr) {
      if( !type ) {
        type = "get";
      }

      if( !data ) {
        data = null;
      }

      if( !token || !url ){
        throw Error("Url and token should be set");
      }

      if( !returnXhr ) {
        return Q($.ajax({
          url: url,
          method: type,
          data: data,
          headers: {
            "Authorization": "Basic " + token
          }
        }));
      }

      return Q.promise(function (resolve) {
        jQuery.ajax({
          url: url,
          method: type,
          data: data,
          headers: {
            "Authorization": "Basic " + token
          }
        }).then(function (data, textStatus, jqXHR) {
          delete jqXHR.then; // treat xhr as a non-promise
          resolve(jqXHR);
        }, function (jqXHR, textStatus, errorThrown) {
          delete jqXHR.then; // treat xhr as a non-promise
          resolve(jqXHR);
        });
});
    },
    /**
     * Tries to get info about user with current token.
     * If authentication success then return Q object with user data
     * and token.
     * Else return Q object null
     * @param {string} token
     * @return {object} Q object
     */
    authenticateUser: function( token ) {
      return this.sendRequest(
        "https://api.github.com/user",
        token
      )
        .then(function ( data ) {
          return Q({
            user: data,
            token: token
          });
        }, function () {
          return Q( null );
        });
    },

    /**
     * Gets list of repositories for user with current token.
     * If requests handle success then return Q object with list.
     * Else return Q  object with null
     * @param {string} token
     * @return {object} Q object
     */
    getRepositoryList: function( token ) {
      return this.sendRequest(
        "https://api.github.com/user/repos?sort=updated",
        token
      )
        .then(
          function( data ) {
            return Q( data );
          },
          function() {
            return Q( null );
          }
        );
    },

    /**
     * Gets details about selected repository. Request sends with token
     * If requests handle success then return Q object with repository info
     * Else return Q object with null
     * @param token The token for authorize
     * @param {string} repositoryFullName The full name of repository (zapix/Kanbaner)
     * @returns {object} Q object
     */
    getRepositoryDetail: function( token, repositoryFullName ) {
      return this.sendRequest(
        "https://api.github.com/repos/" + repositoryFullName,
        token
      )
        .then(function( data ) {
          return Q( data );
        },
        function() {
          return Q( null );
        });
    },

    /**
     * Gets lit of issues for current repo. Request sends with token.
     * If requests handle success then return Q object with list of issues
     * and info has request next page or not
     * @param {string} token The token for authorize
     * @param {string} repositoryFullName The full name of repository(zapix/kanbanner)
     * @param {string} state The state of issues: 'all', 'open', 'close'. Default is 'all'
     * @param {integer} page The request page number
     * @returns {object} Q object with 2 attributes: data - list of issues and
     * meta - additioal infor about request
     */
    getRepositoryIssues: function( token, repositoryFullName, state, page ) {
      if ( !state ) {
        state = 'all';
      }

      if ( !page ) {
        page = 0;
      }

      return this.sendRequest(
        "https://api.github.com/repos/" + repositoryFullName + '/issues',
        token,
        "get",
        {
          page: page,
          state: state
        },
        true
      )
        .then(function( xhr ) {
          var
            linkHeader = xhr.getResponseHeader( "Link" ),
            linkInfo = parseLinkHeader( linkHeader );

          return Q({
            data: xhr.responseJSON,
            meta: linkInfo
          })
        }, function() {
          return Q( null );
        });
    }

  };

module.exports = GithubResource;
