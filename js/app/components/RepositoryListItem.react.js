var
  React = require( "react" ),
  Router = require( "react-router" ),

  PropTypes = React.PropTypes,
  Link = Router.Link,

  RepositoryListItem = React.createClass({
    propTypes: {
      repository: PropTypes.object.isRequired,
      user: PropTypes.object
    },

    render: function() {
      var
        user = this.props.user,
        repository = this.props.repository,
        ownerName = repository.owner.login;

      if( user && user.id == repository.owner.id ) {
        ownerName = "You";
      }

      return (
        <div
          className="row repository-list-item">
          <div
            className="large-5 medium-4 small-12 columns">
            <Link
              to="repository-detail"
              params={{
                repositoryOwner: repository.owner.login,
                repositoryName: repository.name
              }} >
            {repository.full_name}
            </Link>
          </div>
          <div
            className="large-3 medium-3 hide-for-small-only columns text-center">
            {ownerName}
          </div>
          <div
            className="large-2 medium-2 hide-for-small-only columns text-center">
            {repository.open_issues_count}
          </div>
          <div
             className="large-2 medium-3 hide-for-small-only columns text-center">
            <small>{repository.updated_at}</small>
          </div>
        </div>
      )
    }
  });

module.exports = RepositoryListItem;