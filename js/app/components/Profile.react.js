var
  React = require( "react" ),

  UserStore = require( "../stores/UserStore" ),
  AppHeader = require( "./AppHeader.react" ),

  Profile = React.createClass({
    getInitialState: function() {
      return {
        'user': UserStore.getUser()
      };
    },

    render: function() {
      return (
        <AppHeader title="Your profile"/>
      );
    }
  });

module.exports = Profile;
