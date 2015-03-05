var
  React = require( "react" );
  Authentication = require( "../mixins/Authentication" );

  RepositoryList = React.createClass({
    mixins: [ Authentication ],

    render: function() {
      return (
        <div>
          <h2>Welcome to repository list</h2>
        </div>
      );
    }
  });

module.exports = RepositoryList;
