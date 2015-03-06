var
  React = require( "react" ),
  Link = require("react-router").Link,

  Authentication = require( "../mixins/Authentication" ),
  AppHeader = require( "./AppHeader.react" ),
  Breadcrumbs = require( "./Breadcrumbs.react" ) ;

  RepositoryList = React.createClass({
    mixins: [ Authentication ],

    render: function() {
      return (
        <div className="repository-list">
          <AppHeader title="List of repositories"/>
          <Breadcrumbs>
            <span>HOME</span>
            <Link to="user-panel">Repository list</Link>
          </Breadcrumbs>
        </div>
      );
    }
  });

module.exports = RepositoryList;
