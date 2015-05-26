var
  React = require( "react/addons" ),
  Router = require( "react-router" ),
  classNames  = require( "classnames" ),

  AppHeader = require( "./AppHeader.react" ),
  Breadcrumbs = require( "./Breadcrumbs.react" ),
  CollaboratorSelect = require( "./CollaboratorSelect.react" ),

  UserStore = require( "../stores/UserStore" ),
  RepositoryStore = require( "../stores/RepositoryStore" ),
  IssueStore = require( "../stores/IssueStore" ),
  RepositoryActions = require( "../actions/RepositoryActions" ),
  IssueActions = require( "../actions/IssueActions" ),
  InternalMessageActions = require( "../actions/InternalMessageActions" ),
  Logger = require( "../utils/Logger" ),

  logger = new Logger( "CreateIssue" ),

  Link = Router.Link,

  CreateIssue = React.createClass({
    mixins: [React.addons.LinkedStateMixin, Router.Navigation],

    getInitialState: function() {
      return {
        repository: RepositoryStore.getSelectedRepository(),
        token: UserStore.getToken(),
        title: "",
        description: "",
        assignee: null,
        issueCreateStatus: IssueStore.getIssueCreateStatus(),
        issueCreateErrors: IssueStore.getIssueCreateErrors()
      }
    },

    componentDidMount: function() {
      IssueStore.addIssueCreateStatusChangedListener(
        this.handleIssueCreateStatusChanged
      );
    },

    componentWillUnmount: function() {
      IssueStore.removeIssueCreateStatusChangedListener(
        this.handleIssueCreateStatusChanged
      );
      IssueActions.issueCreateClear();
    },

    /**
     * Gets list of field erros. if there are no errors for field return
     * empty array
     * @param {string} fieldName
     * @return {Array}
     */
    getFieldErrors: function( fieldName ) {
      var
        issueCreateErrors = this.state.issueCreateErrors;

      if ( !issueCreateErrors ) {
        return [];
      }

      return issueCreateErrors.errors.filter(function( error ) {
        return error.field == fieldName;
      });
    },

    render: function() {
      var
        repository = this.state.repository,
        repositoryOwner = repository.owner.login,
        repositoryName = repository.name,
        issueCreateStatus = this.state.issueCreateStatus,
        issueCreateErrors = this.state.issueCreateErrors,
        issueCreateStatusTypes = IssueStore.issueCreateStatusTypes,
        titleErrors = this.getFieldErrors( 'title' ),
        titleClassNames = classNames({
          "error": titleErrors.length > 0
        }),
        descriptionErrors = this.getFieldErrors( 'description' ),
        descriptionClassNames = classNames({
          "error": descriptionErrors.length > 0
        }),
        assigneeErrors = this.getFieldErrors( 'assignee' ),
        assigneeClassNames = classNames({
          "error": assigneeErrors.length > 0
        }),
        alertRow;

      if ( issueCreateStatus == issueCreateStatusTypes.FAILED ) {
        alertRow = (
          <div className="alert-box alert radius">
            Fix fields, please.
          </div>
        );
      }

      if( issueCreateStatus == issueCreateStatusTypes.ERROR ) {
        alertRow = (
          <div className="alert-box alert radius">
            Something goes wrong. Please try to reload page.
          </div>
        );
      }

      logger.debug( "title classes", issueCreateErrors );

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
                    {alertRow}
                    <div>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className={titleClassNames}
                        placeholder="Title"
                        ref="title"
                        valueLink={this.linkState( 'title' )}
                      />
                     { titleErrors.map( function( item ) {
                       var
                         errorMessages = {
                           missing_field: "This field is required"
                         };
                       return (
                         <small className="error">{errorMessages[item.code]}</small>
                       )
                     })}
                    </div>
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        className={descriptionClassNames}
                        placeholder="Description"
                        ref="description"
                        valueLink={this.linkState( 'description' )}
                      />
                    </div>
                    <div>
                      <CollaboratorSelect
                        id="assignee"
                        name="assignee"
                        className={assigneeClassNames}
                        ref="assignee"
                        valueLink={this.linkState( 'assignee' )}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="columns small-offset-2 small-8">
                    <button
                      type="submit"
                      className="button expand"
                      disabled={issueCreateStatus == issueCreateStatusTypes.STARTED}
                    >
                      Create issue
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      );
    },

    handleSubmit: function( e ) {
      e.preventDefault();
      IssueActions.createIssue(
        this.state.token,
        this.state.repository.full_name,
        {
          title: this.state.title,
          description: this.state.description,
          assignee: this.state.assignee
        }
      );
    },

    handleIssueCreateStatusChanged: function() {
      var
        repository = this.state.repository,
        repositoryOwner = repository.owner.login,
        repositoryName = repository.name;

      this.setState({
        repository: this.state.repository,
        token: this.state.token,
        title: this.state.title,
        description: this.state.description,
        assignee: this.state.assignee,
        issueCreateStatus: IssueStore.getIssueCreateStatus(),
        issueCreateErrors: IssueStore.getIssueCreateErrors()

      });

      if(
        this.state.issueCreateStatus == IssueStore.issueCreateStatusTypes.CREATED
      ) {
        this.transitionTo(
          'repository-detail',
          {
            repositoryOwner: repositoryOwner,
            repositoryName: repositoryName
          }
        );
      }
    }

  });

module.exports = CreateIssue;

