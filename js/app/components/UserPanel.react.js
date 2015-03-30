var
  React = require( "react" ),
  Router = require( "react-router" ),
  RouteHandler = Router.RouteHandler,

  Authentication = require( "../mixins/Authentication" ),

  UserPanel = React.createClass({
    mixins: [ Authentication ],

    render: function() {
      console.log("[UserPanel]", this.props);
      return (
        <RouteHandler {...this.props} />
      )
    }
  });

module.exports = UserPanel;
