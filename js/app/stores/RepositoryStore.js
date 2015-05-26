var
  assign = require( "object-assign" ),
  EventEmitter = require( "events" ).EventEmitter,

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),

  Logger = require( "../utils/Logger" ),

  logger = new Logger( "RepositoryStore" ),

  ActionTypes = KanbanerConstants.ActionTypes,

  REPOSITORY_LIST_CHANGED = "repository-list-changed",
  REPOSITORY_LIST_CHANGE_FAILED = "repository-list-update-failed",
  REPOSITORY_SELECTED = "repository-selected",
  REPOSITORY_SELECT_FAILED = "repository-select-failed",

  repositoryList = [],
  selectedRepository = null,

  repositoryListChanged  = function( data ) {
    repositoryList = data;
    RepositoryStore.emitRepositoryListChanged();
  },

  repositoryListChangeFailed = function() {
    RepositoryStore.emitRepositoryListChangeFailed();
  },

  repositorySelected = function ( data ) {
    selectedRepository = data;
    RepositoryStore.emitRepositorySelectedEvent();
  },

  repositorySelectFailed = function () {
    RepositoryStore.emitRepositorySelectFailedEvent();
  },

  clearSelectRepository = function() {
    selectedRepository = null;
    RepositoryStore.emitRepositorySelectedEvent();
  },

  RepositoryStore = assign({}, EventEmitter.prototype, {
    /**
     * Return list of available repositories
     * @returns {Array}
     */
    getRepositoryList: function() {
      return repositoryList;
    },

    /**
     * Return selected repository
     */
    getSelectedRepository: function() {
      return selectedRepository;
    },

    /**
     * Add callback to listen REPOSITORY_LIST_CHANGED events
     * @param {function} callback
     */
    addRepositoryListChangedListener: function( callback ) {
      this.on( REPOSITORY_LIST_CHANGED, callback );
    },

    /**
     * Remove call back from listen REPOSITORY_LIST_CHANGED events
     * @param {function} callback
     */
    removeRepositoryListChangedListener: function( callback ) {
      this.removeListener( REPOSITORY_LIST_CHANGED, callback );
    },

    /**
     * Send REPOSITORY_LIST_CHANGED event
     */
    emitRepositoryListChanged: function() {
      this.emit( REPOSITORY_LIST_CHANGED );
    },

    /**
     * Add callback to listen REPOSITORY_LIST_CHANGE_FAILED event
     * @param {function} callback
     */
    addRepositoryListChangeFailedListener: function( callback ) {
      this.on( REPOSITORY_LIST_CHANGE_FAILED, callback );
    },

    /**
     * Remove callback to listen REPOSITORY_LIST_CHANGE_FAILED event
     * @param {function} callback
     */
    removeRepositoryListChangeFailedListener: function( callback ) {
      this.removeListener( REPOSITORY_LIST_CHANGE_FAILED, callback );
    },

    /**
     * Send REPOSITORY_LIST_CHANGED event
     */
    emitRepositoryListChangeFailed: function() {
      this.emit( REPOSITORY_LIST_CHANGE_FAILED );
    },


    /**
     * Add callback to listen REPOSITORY_SELECT event
     * @param {function} callback
     */
    addRepositorySelectedListener: function( callback ) {
      this.on( REPOSITORY_SELECTED, callback );
    },

    /**
     * Remove callback from listen REPOSITORY_SELECT event
     */
    removeRepositorySelectedListener: function( callback ) {
      this.removeListener( REPOSITORY_SELECTED, callback );
    },

    /**
     * Send REPOSITORY_SELECTED event
     */
    emitRepositorySelectedEvent: function() {
      this.emit( REPOSITORY_SELECTED )
      logger.debug("Emit repository selected");
    },

    /**
     * Add callback to listen REPOSITORY_SELECT_FAILED event
     * @param {function} callback
     */
    addRepositorySelectFailedListener: function( callback ) {
      this.on( REPOSITORY_SELECT_FAILED, callback );
    },

    /**
     * Remove callback from listen REPOSITORY_SELECTED_FAILED event
     * @param {function} callback
     */
    removeRepositorySelectFailedListener: function( callback ) {
      this.removeListener( REPOSITORY_SELECT_FAILED, callback);
    },

    /**
     * Send REPOSITORY_SELECT_FAILED event
     */
    emitRepositorySelectFailedEvent: function() {
      this.emit( REPOSITORY_SELECT_FAILED );
    }

  });

  RepositoryStore.dispatchToken = KanbanerDispatcher.register(
    function(payload) {
      var action = payload.action;

      switch( action.type ) {
        case ActionTypes.REPOSITORIES_LOAD_SUCCESS:
          repositoryListChanged( action.data );
          break;
        case ActionTypes.REPOSITORIES_LOAD_FAIL:
          repositoryListChangeFailed();
          break;
        case ActionTypes.REPOSITORY_SELECT_SUCCESS:
          repositorySelected( action.data );
          break;
        case ActionTypes.REPOSITORY_SELECT_FAIL:
          repositorySelectFailed();
          break;
        case ActionTypes.REPOSITORY_SELECT_CLEAR:
          clearSelectRepository();
          break;
      }
    }
  );

module.exports = RepositoryStore;
