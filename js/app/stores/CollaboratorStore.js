var
  assign = require( "object-assign" ),
  EventEmitter = require( "events" ).EventEmitter,

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),

  Logger = require( "../utils/Logger" ),

  logger = new Logger( "CollaboratorStore" ),

  ActionTypes = KanbanerConstants.ActionTypes,

  COLLABORATOR_LIST_CHANGED = "collaborator-list-changed",

  collaboratorList = [],

  /**
   * Set new collaborator list. Emit that collaborator list has been changed
   * @param {Array} newCollaboratorList
   */
  setCollaborators = function( newCollaboratorList ) {
    collaboratorList = newCollaboratorList;
    CollaboratorStore.emitCollaboratorListChanged();
  },

  /**
   * Clear collaborator list. Emit that collaborator list has been changed
   */
  clearCollaborators = function( ) {
    collaboratorList = [];
    CollaboratorStore.emitCollaboratorListChanged();
  },

  CollaboratorStore = assign({}, EventEmitter.prototype, {
    /**
     * Get list of collaborators
     * @returns {Array}
     */
    getCollaboratorList: function() {
      return collaboratorList;
    },

    /**
     * Add listener for COLLABORATOR_LIST_CHANGED event
     * @param {function} callback
     */
    addCollaboratorListChangedListener: function( callback ) {
      this.on( COLLABORATOR_LIST_CHANGED, callback)
    },

    /**
     * Remove listener for COLLABORATOR_LIST_CHANGED event
     * @param {function} callback
     */
    removeCollaboartorListChangedListener: function( callback ) {
      this.removeListener( COLLABORATOR_LIST_CHANGED, callback );
    },

    /**
     * Emit COLLABORATOR_LIST_CHANGED event
     */
    emitCollaboratorListChanged: function() {
      this.emit( COLLABORATOR_LIST_CHANGED );
    }
  });

CollaboratorStore.dispatchToken = KanbanerDispatcher.register(
  function( payload ) {
    var action = payload.action;

    switch ( action.type ) {
      case ActionTypes.COLLABORATORS_CLEAR:
        clearCollaborators();
        break;
      case ActionTypes.COLLABORATORS_LOAD_SUCCESS:
        setCollaborators( action.data );
        break;
    }
  }
);

module.exports = CollaboratorStore;