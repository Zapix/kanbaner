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

  ISSUE_CREATE_STATUS_CHANGED = "issue-create-stats-changed",

  issueCreateStatusTypes = {
    NOT_STARTED: 0,
    STARTED: 1,
    CREATED: 2,
    FAILED: 3,
    ERROR: 4
  },

  issueCreateErrors = null,

  issueCreateStatus = issueCreateStatusTypes.NOT_STARTED,

  appendIssues = function(newIssueList) {
    issueList = issueList.concat( newIssueList );
    IssueStore.emitIssueListChanged();
  },

  clearIssues = function() {
    issueList = [];
    IssueStore.emitIssueListChanged();
  },

  /**
   * Set new issueCreateStatus and send event that issue has been created
   * @param {Number} newIssueCreateStatus
   */
  setIssueCreateStatus = function( newIssueCreateStatus ) {
    issueCreateStatus = newIssueCreateStatus;
    IssueStore.emitIssueCreateStatusChanged()
  },

  /**
   * Set error
   * @param {*} errors
   */
  setIssueErrors = function( errors ) {
    issueCreateErrors = errors;
  },

  IssueStore = assign({}, EventEmitter.prototype, {
    issueCreateStatusTypes: issueCreateStatusTypes,

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
      this.emit( ISSUE_LIST_CHANGED );
    },

    /**
     * Return issue create status
     * @returns {Number}
     */
    getIssueCreateStatus: function() {
      return issueCreateStatus;
    },

    /**
     * Return issue create errors
     */
    getIssueCreateErrors: function() {
      return issueCreateErrors;
    },

    /**
     * Add callback for ISSUE_CREATE_STATUS_CHANGED event
     * @param callback
     */
    addIssueCreateStatusChangedListener: function( callback ) {
      this.on( ISSUE_CREATE_STATUS_CHANGED, callback );
    },

    /**
     * Remove callback for ISSUE_CREATE_STAUTS_CHANGED event
     * @param callback
     */
    removeIssueCreateStatusChangedListener: function( callback ) {
      this.removeListener( ISSUE_CREATE_STATUS_CHANGED, callback );
    },

    emitIssueCreateStatusChanged: function() {
      this.emit( ISSUE_CREATE_STATUS_CHANGED );
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
      case ActionTypes.ISSUE_CREATE_START:
        setIssueCreateStatus( issueCreateStatusTypes.STARTED );
        setIssueErrors( null );
        break;
      case ActionTypes.ISSUE_CREATE_SUCCESS:
        setIssueCreateStatus( issueCreateStatusTypes.CREATED );
        break;
      case ActionTypes.ISSUE_CREATE_FAIL:
        setIssueErrors( action.data );
        setIssueCreateStatus( issueCreateStatusTypes.FAILED );
        break;
      case ActionTypes.ISSUE_CREATE_ERROR:
        setIssueCreateStatus( issueCreateStatusTypes.ERROR );
        break;
      case ActionTypes.ISSUE_CREATE_CLEAR:
        setIssueCreateStatus( issueCreateStatusTypes.NOT_STARTED );
        setIssueErrors( null );
        break;
    }
  }
);

module.exports = IssueStore;
