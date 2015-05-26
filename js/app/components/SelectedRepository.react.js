var
  React = require( "react" ),
  Router = require( "react-router" ),
  RouteHandler = Router.RouteHandler,

  UserStore = require( "../stores/UserStore" ),
  RepositoryStore = require( "../stores/RepositoryStore" ),
  RepositoryActions = require( "../actions/RepositoryActions" ),

  Logger = require( "../utils/Logger" ),

  logger = new Logger( "SelectedRepository" ),

  PropTypes = React.PropTypes,

  getState = function() {
    return {
      token: UserStore.getToken(),
      repositoryList: RepositoryStore.getRepositoryList(),
      selectedRepository: RepositoryStore.getSelectedRepository()
    }
  },

  SelectedRepository= React.createClass({

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
      );
    },

    componentWillUnmount: function() {
      RepositoryStore.removeRepositorySelectedListener(
        this.handleRepositorySelected
      );
      RepositoryStore.removeRepositorySelectFailedListener(
        this.handleRepositorySelectFailed
      );
      RepositoryActions.clearSelectedRepository();
    },

    render: function() {

      if ( !this.state.selectedRepository ) {
        return false;
      }
      logger.debug( "Render route handler" );
      logger.debug( this.state.selectedRepository );
      logger.debug( this.props );

      return (
        <RouteHandler
          {...this.props} />
      );
    },

    handleRepositorySelected: function() {
      this.setState( getState() );
    },

    handleRepositorySelectFailed: function() {
      console.log( "[RepositoryDetail]", "Go to 404 page" );
    }
  });

module.exports = SelectedRepository;
