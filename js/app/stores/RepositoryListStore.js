var
  assign = require( "object-assign" ),
  EventEmitter = require( "events" ).EventEmitter,

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),

  ActionTypes = KanbanerConstants.ActionTypes,

  REPOSITORY_LIST_CHANGED = "repository-list-changed",
  REPOSITORY_LIST_CHANGE_FAILED = "repository-list-update-failed",

  repositoryList = [],

  repositoryListChanged  = function( data ) {
    repositoryList = data;
    RepositoryListStore.emitRepositoryListChanged();
  },

  repositoryListChangeFailed = function() {
    RepositoryListStore.emitRepositoryListChangeFailed();
  },

  RepositoryListStore = assign({}, EventEmitter.prototype, {
    /**
     * Return list of available repositories
     * @returns {Array}
     */
    getRepositoryList: function() {
      return repositoryList;
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
    }

  });

  RepositoryListStore.dispatchToken = KanbanerDispatcher.register(
    function(payload) {
      var action = payload.action;

      switch( action.type ) {
        case ActionTypes.REPOSITORIES_LOAD_SUCCESS:
          repositoryListChanged( action.data );
          break;
        case ActionTypes.REPOSITORIES_LOAD_FAIL:
          repositoryListChangeFailed();
          break;
      }
    }
  );

module.exports = RepositoryListStore;
