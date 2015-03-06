var
  React = require( "react" ),

  AppHeader = require( "./AppHeader.react" ),

  About = React.createClass({
    render: function() {
      return (
        <AppHeader title="About" />
      );
    }
  });


module.exports = About;
