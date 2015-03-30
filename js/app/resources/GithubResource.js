var
  Q = require( "q" ),
  $ = require( "jquery" ),

  GithubResource = {

    /**
     * Sends request to url with authorization token.
     * Returns Q object
     * @param {string} url The url to send request
     * @param {string} token Token for authorization.
     * @param {string} type Type of request if type not set user get
     * @param {object} data Data for request. Could be null
     */
    sendRequest: function(url, token, type, data) {
      if( !type ) {
        type = "get";
      }

      if( !data ) {
        data = null;
      }

      if( !token || !url ){
        throw Error("Url and token should be set");
      }

      return Q($.ajax({
        url: url,
        method: type,
        data: data,
        headers: {
          "Authorization": "Basic " + token
        }
      }));
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
      return this.sendRequest( "https://api.github.com/user", token )
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
    }
  };

module.exports = GithubResource;
