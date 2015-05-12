var
  React = require( "react" ),
  Router = require( "react-router" ),
  AppHeader = require( "./AppHeader.react" ),
  Breadcrumbs = require( "./Breadcrumbs.react" ),
  RepositoryDetailsBar = require( "./RepositoryDetailsBar.react" ),
  IssueDesk = require( "./IssueDesk.react" ),
  RepositoryStore = require( "../stores/RepositoryStore" ),

  Logger = require( "../utils/Logger" ),

  logger = new Logger( "RepoisotryDetail" ),

  Link = Router.Link,

  RepositoryDetail = React.createClass({

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
        <div className="repository-detail-component">
          <AppHeader title={repository.full_name}/>
          <Breadcrumbs>
            <span>HOME</span>
            <Link to="user-panel">Repository list</Link>
            <Link
              to="repository-detail"
              params={{
                repositoryOwner: repositoryOwner,
                repositoryName: repositoryName
              }}
            >
              {repository.full_name}
            </Link>
          </Breadcrumbs>
          <div
            className="app-main">
            <RepositoryDetailsBar
              repositoryOwner={repositoryOwner}
              repositoryName={repositoryName}
            />
            <IssueDesk
              repositoryOwner={repositoryOwner}
              repositoryName={repositoryName}
            />
          </div>
        </div>
      );
    }
  });

module.exports = RepositoryDetail;
