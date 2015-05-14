jest.dontMock( "q" );
jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../InternalMessageActions" );

describe( "InternalMessageActions", function() {
  var
    Q,
    KanbanerDispatcher,
    InternalMessageActions;

  beforeEach(function() {
    Q = require( "q" );
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    InternalMessageActions = require( "../InternalMessageActions" );
  });

  it( "Send message with type success", function() {
    InternalMessageActions.sendMessage( "Hello world!", "success" )
      .then(function() {
        expect( KanbanerDispatcher.handleViewAction ).toBeCalled();
        expect(
          KanbanerDispatcher.handleViewAction.mock.calls[0][0].action.type
        ).toEqual( "success" );
      });
  });

  it( "Send message with default type", function() {
    InternalMessageActions.sendMessage( "Hello world!" )
      .then(function() {
        expect( KanbanerDispatcher.handleViewAction ).toBeCalled();
        expect(
          KanbanerDispatcher.handleViewAction.mock.calls[0][0].action.type
        ).toEqual( "default" );
      });
  });
});