var
  React = require( "react" ),
  localStorage  = require( "localStorage" ),
  UserStore = require( "../stores/UserStore" ),
  UserActions = require( "../actions/UserActions" ),

  LocalStorage = React.createClass({
    componentDidMount: function() {
      UserStore.addUserLoggedInListener(this.onUserLogin);
      UserStore.addUserLoggedOutListener(this.onUserLogout);

      console.log( "[LocalStorageView] Init");
      var token =  localStorage.getItem( "token" );
      console.log( "[LocalStorageView] ", token );
      if ( token ) {
        UserActions.checkToken( token );
      }
    },

    render: function() {
      return null;
    },

    /**
     * Handle user login event. Writes token to localStorage
     */
    onUserLogin: function() {
      var token = UserStore.getToken();
      localStorage.setItem( "token", token );
    },

    /**
     * Handle user logout event. Removes token form localStorage
     */
    onUserLogout: function() {
      localStorage.removeItem( "token" );
    }
  });

module.exports = LocalStorage;
