var
  assign = require( "object-assign" ),
  EventEmitter = require( "events" ).EventEmitter,

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),

  ActionTypes = KanbanerConstants.ActionTypes,

  LOADER_STORE_INIT = "loader-store-init",
  LOADER_CHANGE = "loader-change",

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

  /**
   * init loader store
   */
  initLoaderStore = function() {
    LoaderStore.emitLoaderStoreInit()
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
      this.emit(LOADER_CHANGE);
    },

    /**
     * Add loader store init event listener
     * @param callback
     */
    addLoaderStoreInitListener: function(callback) {
      this.on(LOADER_STORE_INIT, callback)
    },

    /**
     * Remove loader store init event listener
     * @param callback
     */
    removeLoaderStoreInitListener: function(callback) {
      this.on(LOADER_STORE_INIT, callback);
    },

    /**
     * send Loader store init event
     */
    emitLoaderStoreInit: function() {
      this.emit(LOADER_STORE_INIT);
    }
  });

LoaderStore.dispatchToken = KanbanerDispatcher.register(function( payload) {
  var action = payload.action;

  switch( action.type ) {
    case ActionTypes.APP_INIT:
      initLoaderStore();
      break;
    case ActionTypes.LOADER_SHOW:
      showLoader();
      break;
    case ActionTypes.LOADER_HIDE:
      hideLoader();
      break;
  }
});

module.exports = LoaderStore;