var
  Q = require( "q" ),
  $ = require( "jquery" ),

  GithubResource = {
    /**
     * Tries to get info about user with current token.
     * If authentication success then return Q object with user data
     * and token.
     * Else return Q object null
     * @param {string} token
     * @return {object} Q object
     */
    authenticateUser: function(token) {
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
    }
  };

module.exports = GithubResource;
