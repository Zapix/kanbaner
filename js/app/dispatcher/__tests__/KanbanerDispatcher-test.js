jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../KanbanerDispatcher" );
jest.dontMock( "flux" );
jest.dontMock( "object-assign" );


describe( "KanbanerDispatcher", function() {
  var
    KanbanerDispatcher,
    KanbanerConstants,
    ActionTypes;

  beforeEach(function() {
    KanbanerDispatcher = require( "../KanbanerDispatcher" );
    KanbanerConstants = require( "../../constants/KanbanerConstants" );
    ActionTypes = KanbanerConstants.ActionTypes;
  });

  it( "check dispatcher works", function() {
    var
      handler = jest.genMockFunction();
      action = {
        type: ActionTypes.REPOSITORIES_LOAD_SUCCESS
      };

    KanbanerDispatcher.register( handler );

    KanbanerDispatcher.handleViewAction( action );

    expect( handler ).toBeCalled();
  })
});