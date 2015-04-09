var
  React = require( "react" ),
  Logger = require( "../utils/logger" ),

  logger = new Logger( "IssueCard" ),

  PropTypes = React.PropTypes,

  IssueCard = React.createClass({

    propTypes: {
      issue: PropTypes.object.isRequired
    },

    render: function() {
      var
        issue = this.props.issue,
        renderedAssignee = this.renderAssignee();

      return (
        <div
          className="issue-card">
          <div
            className="header">
            <div
              className="issue-number right">{"#" + issue.number}
            </div>
            <div
              className="issue-title">
              {issue.title}
            </div>
          </div>
          <div className="details clearfix">
            {renderedAssignee}
            <div className="short-description">{issue.body}</div>
          </div>
        </div>
      )
    },

    renderAssignee: function() {
      var
        issue = this.props.issue,
        renderedNickname,
        renderedImage;

      logger.debug( issue.assignee );
      if ( issue.state == 'open' && ! issue.assignee ) {
        return "";
      }

      if ( issue.assignee ) {
        if ( typeof issue.assignee === "string" ) {
          renderedImage = (
            <img width="44" height="44" src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y&s=44" />
          );
          renderedNickname = issue.assignee.login;
        } else {
          renderedImage = (
            <img width="44" height="44" src={issue.assignee.avatar_url}/>
          );
          renderedNickname = issue.assignee.login;
        }

        return (
          <div className="assigned right">
            <div>{renderedImage}</div>
            <div className="nickname">{renderedNickname}</div>
          </div>
        )
      }


    }
  });

module.exports = IssueCard;
