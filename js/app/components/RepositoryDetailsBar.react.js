var
  React = require( "react" ),
  Router = require( "react-router" ),
  Logger = require( "../utils/logger" ),

  PropTypes = React.PropTypes,
  logger = new Logger( "RepositoryDetailsBar" ),

  Link = Router.Link,

  RepositoryDetailsBar = React.createClass({
    propTypes: {
      repositoryOwner: PropTypes.string.isRequired,
      repositoryName: PropTypes.string.isRequired
    },

    render: function() {
      var
        repositoryOwner = this.props.repositoryOwner,
        repositoryName = this.props.repositoryName;

      return (
        <div
          className="row repository-details-bar">
          <div
            className="large-12 medium-12 small-12 columns">
            <Link
              className="right button"
              to="create-issue"
              params={{
                repositoryOwner: repositoryOwner,
                repositoryName: repositoryName
              }}
            >
              New Issue
            </Link>
          </div>
        </div>
      )
    }
  });

module.exports = RepositoryDetailsBar;

