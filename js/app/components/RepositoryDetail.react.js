var
  React = require( "react" ),
  Router = require( "react-router" ),
  AppHeader = require( "./AppHeader.react" ),
  Breadcrumbs = require( "./Breadcrumbs.react" ),
  RepositoryDetailsBar = require( "./RepositoryDetailsBar.react" ),
  IssueDesk = require( "./IssueDesk.react" ),
  UserStore = require( "../stores/UserStore" ),
  RepositoryStore = require( "../stores/RepositoryStore" ),
  RepositoryActions = require( "../actions/RepositoryActions" ),


  Link = Router.Link,
  PropTypes = React.PropTypes,

  getState = function() {
    return {
      token: UserStore.getToken(),
      repositoryList: RepositoryStore.getRepositoryList(),
      selectedRepository: RepositoryStore.getSelectedRepository()
    }
  },

  RepositoryDetail = React.createClass({

    contextTypes: {
      router: PropTypes.func
    },

    getInitialState: function() {
      return getState();
    },

    componentDidMount: function() {
      var
        repositoryOwner = this.props.params.repositoryOwner,
        repositoryName = this.props.params.repositoryName,
        title = repositoryOwner + "/" + repositoryName;

      RepositoryStore.addRepositorySelectedListener(
        this.handleRepositorySelected
      );
      RepositoryStore.addRepositorySelectFailedListener(
        this.handleRepositorySelectFailed
      );

      RepositoryActions.requestRepositoryDetail(
        this.state.token,
        title,
        this.state.repositoryList
      )
    },

    componentWillUnmount: function() {
      RepositoryStore.removeRepositorySelectedListener(
        this.handleRepositorySelected
      );
      RepositoryStore.removeRepositorySelectFailedListener(
        this.handleRepositorySelectFailed
      );
    },

    render: function() {
      var
        repositoryOwner = this.props.params.repositoryOwner,
        repositoryName = this.props.params.repositoryName,
        selectedRepository;

      if ( !this.state.selectedRepository ) {
        return false;
      }

      selectedRepository = this.state.selectedRepository;

      return (
        <div className="repository-detail-component">
          <AppHeader title={selectedRepository.full_name}/>
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
              {selectedRepository.full_name}
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
    },

    handleRepositorySelected: function() {
      this.setState( getState() );
    },

    handleRepositorySelectFailed: function() {
      console.log( "[RepositoryDetail]", "Go to 404 page" );
    }
  });

module.exports = RepositoryDetail;
