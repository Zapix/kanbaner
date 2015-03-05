var
  React = require( "react" ),
  Router = require( "react-router" ),
  RouteHandler = Router.RouteHandler,

  Authentication = require( "../mixins/Authentication" );

  UserPanel = React.createClass({
    mixins: [ Authentication ],

    render: function() {
      return (
        <RouteHandler/>
      )
    }
  });

module.exports = UserPanel;
