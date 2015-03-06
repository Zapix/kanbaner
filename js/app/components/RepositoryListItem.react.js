var
  React = require( "react" ),
  PropTypes = React.PropTypes,

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
          className="row repoistory-list-item">
          <div
            className="large-5 medium-4 small-12 columns">
            <a href="#">{repository.full_name}</a>
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