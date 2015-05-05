var
  Q = require( "q" ),

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),

  ActionTypes = KanbanerConstants.ActionTypes,

  LoaderActions = {
    showLoader: function() {
      KanbanerDispatcher.handleViewAction({
        type: ActionTypes.LOADER_SHOW
      });
      return Q( "show-loader" );
    },

    hideLoader: function() {
      KanbanerDispatcher.handleViewAction({
        type: ActionTypes.LOADER_HIDE
      });
      return Q( "hide-loader" );
    }
  };

module.exports = LoaderActions;
