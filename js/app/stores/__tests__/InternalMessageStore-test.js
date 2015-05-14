jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../InternalMessageStore" );
jest.dontMock( "object-assign" );
jest.dontMock( "keymirror" );

describe( "InternalMessageStore", function() {
  var
    callback,
    KanbanerDispatcher,
    InternalMessageStore,
    KanbanerConstants = require( "../../constants/KanbanerConstants" ),
    PayloadSources = KanbanerConstants.PayloadSources,
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    InternalMessageStore = require( "../InternalMessageStore" );
    callback = KanbanerDispatcher.register.mock.calls[0][0];
  });

  it( "Check getting message", function() {
    var
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.SEND_INTERNAL_MESSAGE,
          data: {
            message: "Hello world",
            type: "test"
          }
        }
      },
      messageList;

    callback( payload );

    messageList = InternalMessageStore.getMessageList();

    expect( messageList.length ).toEqual( 1 );

    messageList = InternalMessageStore.getMessageList();

    expect( messageList.length ).toEqual( 0 );
  });

  it( "Check getting several messages", function() {
    var
      payloadFirst = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.SEND_INTERNAL_MESSAGE,
          data: {
            message: "Hello world",
            type: "test"
          }
        }
      },
      payloadSecond = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.SEND_INTERNAL_MESSAGE,
          data: {
            message: "Another message",
            type: "success"
          }
        }
      },
      messageList;

    callback( payloadFirst );
    callback( payloadSecond );

    messageList = InternalMessageStore.getMessageList();
    expect( messageList.length ).toEqual( 2 );

    messageList = InternalMessageStore.getMessageList();
    expect( messageList.length ).toEqual( 0 );
  } );

  it( "Add/remove listeners", function() {
    var
      payloadFirst = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.SEND_INTERNAL_MESSAGE,
          data: {
            message: "Hello world",
            type: "test"
          }
        }
      },
      payloadSecond = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.SEND_INTERNAL_MESSAGE,
          data: {
            message: "Another message",
            type: "success"
          }
        }
      },
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction();

    InternalMessageStore.addInternalMessageAddedListener( firstListener );
    InternalMessageStore.addInternalMessageAddedListener( secondListener );

    callback( payloadFirst );

    InternalMessageStore.removeInternalMessageAddedListener( secondListener );

    callback( payloadSecond );

    expect( firstListener.mock.calls.length ).toEqual( 2 );
    expect( secondListener.mock.calls.length ).toEqual( 1 );

  });
});
