var
  React = require( "react" ),

  UserStore = require( "../stores/UserStore" ),

  Profile = React.createClass({
    getInitialState: function() {
      return {
        'user': UserStore.getUser()
      };
    },

    render: function() {
      return (
        <h1>Here will be a user profile</h1>
      );
    }
  });

module.exports = Profile;
