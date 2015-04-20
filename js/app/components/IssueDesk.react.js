var
  React = require( "react" ),

  IssueCard = require( "./IssueCard.react" ),
  IssueStore = require( "../stores/IssueStore" ),
  IssueActions = require( "../actions/IssueActions" ),

  UserStore = require( "../stores/UserStore" ),

  Logger = require( "../utils/logger" ),

  PropTypes = React.PropTypes,
  logger = new Logger( "IssueDesk" ),

  getState = function() {
    return {
      'issueList': IssueStore.getIssueList(),
      'token': UserStore.getToken()
    };
  },

  IssueDesk = React.createClass({

    propTypes: {
      repositoryOwner: PropTypes.string.isRequired,
      repositoryName: PropTypes.string.isRequired
    },

    getInitialState: function() {
      return getState();
    },

    componentDidMount: function() {
      var
        repositoryOwner = this.props.repositoryOwner,
        repositoryName = this.props.repositoryName,
        repositoryFullName = repositoryOwner + "/" + repositoryName;

      IssueStore.addIssueListChangedListener( this.handleChange );
      IssueActions.getIssueList( this.state.token, repositoryFullName );
    },

    componentWillUnmount: function() {
      IssueStore.removeIssueListChangedListener( this.handleChange );
      IssueActions.clearIssues();
    },

    render: function() {
      var
        openedIssues = this.state.issueList.filter(function( item ) {
          return item.state == 'open' && !item.assignee;
        }).map(function( item ) {
          return (
            <IssueCard issue={item}/>
          );
        }),
        assignedIssues = this.state.issueList.filter(function( item ) {
          return item.state == 'open' &&  item.assignee;
        }).map(function( item ) {
          return (
            <IssueCard issue={item}/>
          );
        }),
        closedIssues = this.state.issueList.filter(function( item ) {
          return item.state == 'closed';
        }).map(function( item ) {
          return (
            <IssueCard issue={item}/>
          )
        });

      return (
        <div
          className="kanban-desk">
          <div
            className="row">
            <div
              className="large-4 medium-4 small-4 columns">
                <strong>Opened:</strong>
            </div>
            <div
              className="large-4 medium-4 small-4 columns">
              <strong>Assigned:</strong>
            </div>
            <div
              className="large-4 medium-4 small-4 columns">
              <strong>Closed:</strong>
            </div>
          </div>
          <div
            className="row">
            <div
              className="large-4 medium-4 small-4 opened-issues columns">
            {openedIssues}
            </div>
            <div
              className="large-4 medium-4 small-4 assigned-issues columns">
            {assignedIssues}
            </div>
            <div
              className="large-4 medium-4 small-4 closed-issues columns">
            {closedIssues}
            </div>
          </div>
        </div>
      );
    },

    handleChange: function() {
      this.setState(getState());
    }
  });

module.exports = IssueDesk;
