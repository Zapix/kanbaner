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

  if( "Check clear issues", function() {
      var
        payloadLoadSuccess = {
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
        },
        payloadClear = {
          source: PayloadSources.VIEW_ACTION,
          action: {
            type: ActionTypes.ISSUES_CLEAR
          }
        };

      callback( payloadLoadSuccess );
      expect( IssueStore.getIssueList().length ).toEqual( 2 );

      callback(payloadClear )
      expect( IssueStore.getIssueList().length ).toEqual( 0 );
    } );

  it( "Add/remove issue load listeners", function() {
    var
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction(),
      payload = {
        source: PayloadSources.ViewAction,
        action: {
          type: ActionTypes.ISSUES_LOAD_SUCCESS,
          data: [
            {
              id: 12
            },
            {
              id: 42
            }
          ]
        }
      }

    IssueStore.addIssueListChangedListener( firstListener );
    IssueStore.addIssueListChangedListener( secondListener );

    callback( payload );


    expect( firstListener ).toBeCalled();
    expect( secondListener ).toBeCalled();

    IssueStore.removeIssueListChangedListener( secondListener );

    callback( payload );

    expect( firstListener.mock.calls.length ).toEqual( 2 );
    expect( secondListener.mock.calls.length ).toEqual( 1 );
  });


});