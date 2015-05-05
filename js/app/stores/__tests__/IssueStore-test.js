jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../IssueStore" );
jest.dontMock( "object-assign" );

describe( "IssueStore", function() {
  var
    callback,
    KanbanerDispatcher,
    IssueStore,
    KanbanerConstants = require( "../../constants/KanbanerConstants" ),
    PayloadSources = KanbanerConstants.PayloadSources,
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    IssueStore = require( "../IssueStore" );
    callback = KanbanerDispatcher.register.mock.calls[0][0];
  });

  it( "check issues loaded success", function() {
    var
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.ISSUES_LOAD_SUCCESS,
          data: [
            {
              id: 1
            },
            {
              id: 2
            }
          ]
        }
      };

    callback( payload );

    expect( IssueStore.getIssueList().length ).toEqual( 2 );
  });
});