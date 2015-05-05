var
  assign = require( "object-assign" ),
  EventEmitter = require( "events" ).EventEmitter,

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),
  Logger = require( "../utils/Logger" ),

  logger = new Logger( "IssueStore" ),

  ActionTypes = KanbanerConstants.ActionTypes,

  ISSUE_LIST_CHANGED = "issue-list-changed",

  issueList = [],

  appendIssues = function(newIssueList) {
    issueList = issueList.concat( newIssueList );
    IssueStore.emitIssueListChanged();
  },

  clearIssues = function() {
    issueList = [];
    IssueStore.emitIssueListChanged();
  },

  IssueStore = assign({}, EventEmitter.prototype, {
    /**
     * Return list of issues
     * @return {Array}
     */
    getIssueList: function() {
      return issueList;
    },

    /**
     * Add listener for ISSUE_LIST_CHANGED event
     * @param callback
     */
    addIssueListChangedListener: function( callback ) {
      this.on( ISSUE_LIST_CHANGED, callback );
    },

    /**
     * Remove listener for ISSUE_LIST_CHANGED event
     * @param callback
     */
    removeIssueListChangedListener: function( callback ) {
      this.removeListener( ISSUE_LIST_CHANGED, callback );
    },

    /**
     * Emit ISSUE_LIST_CHANGED event
     */
    emitIssueListChanged: function() {
      this.emit( ISSUE_LIST_CHANGED )
    }

  });

IssueStore.dispatchToken = KanbanerDispatcher.register(
  function(payload) {
    var action = payload.action;

    switch ( action.type ) {
      case ActionTypes.ISSUES_CLEAR:
        clearIssues();
        break;
      case ActionTypes.ISSUES_LOAD_SUCCESS:
        appendIssues( action.data );
        break;
    }
  }
);

module.exports = IssueStore;
