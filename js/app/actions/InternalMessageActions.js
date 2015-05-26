var
  Q = require( "q" ),

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),
  ActionTypes = KanbanerConstants.ActionTypes,

  InternalMessageActions = {
    /**
     * Send message with type. If type not set then type is default
     * @param message
     * @param type
     */
    sendMessage: function( message, type ) {
      if( !type ) {
        type = "default";
      }

      KanbanerDispatcher.handleViewAction({
        type: ActionTypes.SEND_INTERNAL_MESSAGE,
        data: {
          message: message,
          type: type
        }
      });
      return Q( "send" );
    }
  };

module.exports = InternalMessageActions;