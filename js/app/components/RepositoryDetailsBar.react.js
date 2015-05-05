var
  React = require( "react" ),
  Router = require( "react-router" ),
  Logger = require( "../utils/logger" ),

  PropTypes = React.PropTypes,
  logger = new Logger( "RepositoryDetailsBar" ),

  RepositoryDetailsBar = React.createClass({
    propTypes: {
      repositoryOwner: PropTypes.string.isRequired,
      repositoryName: PropTypes.string.isRequired
    },

    render: function() {
      logger.debug( "[RepositoryDetailsBar]", this.props.repositoryOwner );
      logger.debug( "[RepositoryDetailsBar]", this.props.repositoryName );
      return (
        <div
          className="row repository-details-bar">
          <div
            className="large-12 medium-12 small-12 columns">
            <a
              className="right button"
              to=""
            >
              New Issue
            </a>
          </div>
        </div>
      )
    }
  });

module.exports = RepositoryDetailsBar;

