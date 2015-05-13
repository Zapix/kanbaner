var
  React = require( "react" ),
  Router = require( "react-router" ),
  AppHeader = require( "./AppHeader.react" ),
  Breadcrumbs = require( "./Breadcrumbs.react" ),
  CollaboratorSelect = require( "./CollaboratorSelect.react" ),

  UserStore = require( "../stores/UserStore" ),
  RepositoryStore = require( "../stores/RepositoryStore" ),
  IssueStore = require( "../stores/IssueStore" ),
  RepositoryActions = require( "../actions/RepositoryActions" ),
  Logger = require( "../utils/Logger" ),

  logger = new Logger( "CreateIssue" ),

  Link = Router.Link,

  CreateIssue = React.createClass({

    getInitialState: function() {
      return {
        repository: RepositoryStore.getSelectedRepository()
      }
    },

    render: function() {
      var
        repository = this.state.repository,
        repositoryOwner = repository.owner.login,
        repositoryName = repository.name;

      return (
        <div className="create-issue-component">
          <AppHeader title="Create issue"/>
          <Breadcrumbs>
            <span>HOME</span>
            <Link to="user-panel">Repository list</Link>
            <Link
              to="repository-detail"
              params={{
                repositoryOwner: repositoryOwner,
                repositoryName: repositoryName
              }}>
            {repository.full_name}
            </Link>
          </Breadcrumbs>

          <div className="app-main">
            <div className="create-issue-component">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="small-12 medium-offest-1 medium-10 large-offset-2 large-8 columns">
                    <div>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                      />
                    </div>
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                      />
                    </div>
                    <div>
                      <CollaboratorSelect id="assignee" name="assignee"/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="columns small-offset-2 small-8">
                    <button type="submit" className="button expand">Create issue</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      );
    },

    handleSubmit: function() {
      logger.debug( "Handle submit" );
    }

  });

module.exports = CreateIssue;

