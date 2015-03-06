var
  React = require( "react" );
  Authentication = require( "../mixins/Authentication" );

  AppHeader = require( "./AppHeader.react" );

  RepositoryList = React.createClass({
    mixins: [ Authentication ],

    render: function() {
      return (
        <AppHeader title="List of repositories"/>
      );
    }
  });

module.exports = RepositoryList;
