var
  assign = require( "object-assign"),
  EventEmitter = require( "events" ).EventEmitter,
  keymirror = require( "keymirror" ),

  KanbanerDispatcher = require( "../dispatcher/KanbanerDispatcher" ),
  KanbanerConstants = require( "../constants/KanbanerConstants" ),

  ActionTypes = KanbanerConstants.ActionTypes,

  events = keymirror({
    INTERNAL_MESSAGE_ADDED: null
  }),

  internalMessageList = [],

  addMessage = function( messageObject ) {
    internalMessageList.push( messageObject );
    InternalMessageStore.emitInternalMessageAdded();
  },

  InternalMessageStore = assign({}, EventEmitter.prototype, {
    /**
     * Return list of message objects and clear array
     * @returns {Array}
     */
    getMessageList: function() {
      var
        messageList = internalMessageList;

      internalMessageList = [];
      return messageList;
    },

    addInternalMessageAddedListener: function( callback ) {
      this.on(events.INTERNAL_MESSAGE_ADDED, callback);
    },

    removeInternalMessageAddedListener: function( callback ) {
      this.removeListener(events.INTERNAL_MESSAGE_ADDED, callback);
    },

    emitInternalMessageAdded: function() {
      this.emit( events.INTERNAL_MESSAGE_ADDED );
    }
  });

InternalMessageStore.dispatchToken = KanbanerDispatcher.register(
  function( payload ) {
    var action = payload.action;
    switch ( action.type ) {
      case ActionTypes.SEND_INTERNAL_MESSAGE:
        addMessage( action.data );
        break;
    }
  }
);

module.exports  = InternalMessageStore;
