var
  React = require( "react" ),
  Link = require("react-router").Link,

  UserStore = require( "../stores/UserStore" ),
  AppHeader = require( "./AppHeader.react" ),
  Breadcrumbs = require( "./Breadcrumbs.react" ),
  RepositoryListHead = require( "./RepositoryListHead.react" ),
  RepositoryListItem = require( "./RepositoryListItem.react" );

  getRepositoryListState = function() {
    return {
      user: UserStore.getUser(),
      repositories: [
        {
          id: 1,
          name: "Kanbaner",
          full_name: "zapix/kanbaner",
          open_issues_count: 12,
          updated_at: "2011-01-26T19:14:43Z",
          has_issues: true,
          owner: {
            id: 346813,
            login: "Zapix"
          }
        },
        {
          id: 4,
          name: "Oblichi-content",
          full_name: "oblichi/oblichi-content",
          open_issues_count: 5,
          updated_at: "2011-01-26T19:14:43Z",
          has_issues: true,
          owner: {
            id: 43,
            login: "atorich"
          }
        },
        {
          id: 8,
          name: "tmnv1",
          full_name: "dtmnv/tmnv1",
          open_issues_count: 10,
          updadated_at: "2011-01-26T19:14:43Z",
          has_issues: true,
          owner: {
            id: 16,
            login: "dtmnv"
          }
        },
        {
          id: 1,
          name: "django-confirmaction",
          full_name: "zapix/django-confirmcation",
          open_issues_count: 0,
          updated_at: "2011-01-26T19:14:43Z",
          has_issues: false,
          owner: {
            id: 346813,
            login: "Zapix"
          }
        }
      ]
    }

  };

    RepositoryList = React.createClass({

    getInitialState: function() {
      return getRepositoryListState();
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
    }
  });

module.exports = RepositoryList;
