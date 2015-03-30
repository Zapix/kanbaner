var
  React = require( "react" ),
  Link = require("react-router").Link,

  RepositoryActions = require( "../actions/RepositoryActions" ),
  UserStore = require( "../stores/UserStore" ),
  RepositoryStore = require( "../stores/RepositoryStore" ),
  AppHeader = require( "./AppHeader.react" ),
  Breadcrumbs = require( "./Breadcrumbs.react" ),
  RepositoryListHead = require( "./RepositoryListHead.react" ),
  RepositoryListItem = require( "./RepositoryListItem.react" ),

  getRepositoryListState = function() {
    return {
      token: UserStore.getToken(),
      user: UserStore.getUser(),
      repositories: RepositoryStore.getRepositoryList()
    }

  },

  RepositoryList = React.createClass({

    getInitialState: function() {
      return getRepositoryListState();
    },

    /**
     * Subscribe to REPOSITORY_LIST_CHANGED event if
     * this.state.repositories is empty then send action to load
     * info about repositories
     */
    componentDidMount: function() {
      RepositoryStore.addRepositoryListChangedListener(
        this.onRepositoryListChanged
      );

      if( this.state.repositories.length == 0) {
        RepositoryActions.requestRepositoryList(this.state.token);
      }
    },

    /**
     * Unsubscribe form REPOSITORY_LIST_CHANGED event
     */
    componentWillUnmount: function() {
      RepositoryStore.removeRepositoryListChangedListener(
        this.onRepositoryListChanged
      );
    },

    render: function() {
      console.log( this.state );
      var user = this.state.user;

      var repositoriesWithIssues = this.state.repositories.filter(
        function( repository ) {
          return repository.has_issues;
        }
      );

      var repositoryItems = repositoriesWithIssues.map(function( repository ) {
        return (
          <RepositoryListItem
            repository={repository}
            user={user}
          />
        )
      });
      return (
        <div className="repository-list-component">
          <AppHeader title="List of repositories"/>
          <Breadcrumbs>
            <span>HOME</span>
            <Link to="user-panel">Repository list</Link>
          </Breadcrumbs>
          <div className="repository-list app-main">
            <RepositoryListHead/>
              {repositoryItems}
          </div>
        </div>
      );
    },

    /**
     * Handles REPOSITORY_LIST_CHANGE event;
     */
    onRepositoryListChanged: function() {
      this.setState(getRepositoryListState());
    }
  });

module.exports = RepositoryList;
