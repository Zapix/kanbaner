var
  UserStore = require( "../stores/UserStore" ),
  Authentication = {
    statics: {
      willTransitionTo: function(transition) {
        var nextPath = transition.path;
        if( !UserStore.isUserLoggedIn() ){
          transition.redirect( "/login", {}, {nextPath: nextPath} );
        }
      }
    }
  };

module.exports = Authentication;
