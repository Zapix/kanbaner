var
  React = require( "react" ),
  Router = require( "react-router" ),
  RouteHandler = Router.RouteHandler,

  UserStore = require( "../stores/UserStore" ),

  Navigation = require( "./Navigation.react" ),
  MainSection = require( "./MainSection.react" ),
  Footer = require( "./Footer.react" );

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
      },

      compoenentWillUnmount: function() {
        UserStore.removeUserLoggedOutListener( this.onUserLoggedOut );
      },

      render: function() {
        return (
          <div>
            <Navigation/>
            <RouteHandler />
            <Footer/>
          </div>
        );
      },

      /**
       * Handler for USER_LOGGED_OUT events
       */
      onUserLoggedOut: function() {
        this.setState( getState() );
        if( !this.state.isUserLoggedIn ) {
          this.transitionTo( "/login" );
        }
      }
    }
  );

module.exports = KanbanerApp;
