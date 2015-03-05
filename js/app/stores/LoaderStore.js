var
  assign = require( "object-assign" ),
  EventEmitter = require( "events" ).EventEmitter,

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),

  ActionTypes = KanbanerConstants.ActionTypes,

  LOADER_CHANGE = 'loader-change',

  isShowLoader = false,

  /**
   * set loader to true and send signal that loader changed
   */
  showLoader = function() {
    isShowLoader = true;
    LoaderStore.emitLoaderChange();
  },

  /**
   * set loader to false and send signal that loader changed
   */
  hideLoader = function() {
    isShowLoader = false;
    LoaderStore.emitLoaderChange();
  },

  LoaderStore = assign({}, EventEmitter.prototype, {
    /**
     * Returns loader status
     * @returns {boolean}
     */
    getLoader: function() {
      return isShowLoader;
    },

    /**
     * Set listeners for LOADER_CHANGE event
     * @param {function} callback
     */
    addLoaderListener: function(callback) {
      this.on(LOADER_CHANGE, callback);
    },

    /**
     * Remove listeners for LOADER_CHANGE event
     * @param callback
     */
    removeLoaderListener: function(callback) {
      this.removeListener(LOADER_CHANGE, callback);
    },

    /**
     * Emit loader change
     */
    emitLoaderChange: function() {
      console.log("[LoaderStore] Send loader event");
      this.emit(LOADER_CHANGE);
    }
  });

LoaderStore.dispatchToken = KanbanerDispatcher.register(function( payload) {
  var action = payload.action;

  switch( action.type ) {
    case ActionTypes.LOADER_SHOW:
      showLoader();
      break;
    case ActionTypes.LOADER_HIDE:
      hideLoader();
      break;
  }
});

module.exports = LoaderStore;