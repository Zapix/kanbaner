var
  React = require( "react" ),
  Router = require( "react-router" ),
  RouteHandler = Router.RouteHandler,

  AppActions = require( "../actions/AppActions" ),
  UserStore = require( "../stores/UserStore" ),

  Navigation = require( "./Navigation.react" ),
  Footer = require( "./Footer.react" ),
  Loader = require( "./Loader.react" ),
  LocalStorage = require( "./LocalStorage.react" );

  getState = function() {
    return {
      isUserLoggedIn: UserStore.isUserLoggedIn()
    };
  };

  KanbanerApp = React.createClass(
    {
      mixins: [Router.Navigation],

      getInitialState: function() {
        return getState();
      },

      componentDidMount: function() {

        UserStore.addUserLoggedOutListener( this.onUserLoggedOut );
        AppActions.initApp();
      },

      compoenentWillUnmount: function() {
        UserStore.removeUserLoggedOutListener( this.onUserLoggedOut );
      },

      render: function() {
        return (
          <div>
            <Navigation/>
            <RouteHandler/>
            <Footer/>
            <Loader/>
            <LocalStorage />
          </div>
        );
      },

      /**
       * Handler for USER_LOGGED_OUT events
       */
      onUserLoggedOut: function() {
        this.setState( getState() );
        this.transitionTo( "app" );
      }
    }
  );

module.exports = KanbanerApp;
