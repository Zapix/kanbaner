jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../LoaderActions" );
jest.dontMock( "q" );
jest.dontMock( "keymirror" );

describe( "LoaderActions", function() {
  var
    Q,
    KanbanerDispatcher,
    LoaderActions,
    KanbanerConstants = require( "../../constants/KanbanerConstants" ),
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    Q = require( "q" );
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    LoaderActions = require( "../LoaderActions" );
  });

  it( "Send show loader", function() {
    LoaderActions.showLoader().then(function() {
      expect( KabanerDispatcher.handleViewAction ).toBeCalled();
      callValue = KanbanerDispatcher.handleViewActon.mocks.call[0][0];
      expect(callValue).toEquals( ActionTypes.LOADER_SHOW );
    });
  });

  it( "Send hide loader", function() {
    LoaderActions.hideLoader().then(function() {
      expect( KabanerDispatcher.handleViewAction ).toBeCalled();
      callValue = KanbanerDispatcher.handleViewActon.mocks.call[0][0];
      expect(callValue).toEquals( ActionTypes.LOADER_HIDE);
    });
  });
});
