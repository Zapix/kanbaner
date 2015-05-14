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

  it( "Check clear issues", function() {
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

      callback(payloadClear );
      expect( IssueStore.getIssueList().length ).toEqual( 0 );
    } );

  it( "Add/remove issue load listeners", function() {
    var
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction(),
      payload = {
        source: PayloadSources.VIEW_ACTION,
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
      };

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

  it( "Test change store issue create start", function() {
    var
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.ISSUE_CREATE_START
        }
      };

    callback( payload );

    expect( IssueStore.getIssueCreateStatus() ).toEqual(
      IssueStore.issueCreateStatusTypes.STARTED
    );
  });

  it( "Issue create status success", function() {
    var
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.ISSUE_CREATE_SUCCESS,
          data: {
            id: 1,
            title: "New issue"
          }
        }
      };

    callback( payload );

    expect( IssueStore.getIssueCreateStatus() ).toEqual(
      IssueStore.issueCreateStatusTypes.CREATED
    );
  });

  it( "Issue create status failed", function() {
    var
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.ISSUE_CREATE_FAIL,
          data: {
            title: "Required field"
          }
        }
      };

    callback( payload );

    expect( IssueStore.getIssueCreateStatus() ).toEqual(
      IssueStore.issueCreateStatusTypes.FAILED
    );

    expect( IssueStore.getIssueCreateErrors() ).not.toBeNull();
  });

  it( "Issue create status error", function() {
    var
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.ISSUE_CREATE_ERROR
        }
      };

    callback( payload );

    expect( IssueStore.getIssueCreateStatus() ).toEqual(
      IssueStore.issueCreateStatusTypes.ERROR
    );
  });

  it( "Issue create status clear", function() {
    var
      payloadFailed = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.ISSUE_CREATE_FAIL,
          data: {
            title: "Required field"
          }
        }
      },
      payloadClear = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.ISSUE_CREATE_CLEAR
        }
      };

    callback( payloadFailed );
    callback( payloadClear );

    expect( IssueStore.getIssueCreateStatus() ).toEqual(
      IssueStore.issueCreateStatusTypes.NOT_STARTED
    );

    expect( IssueStore.getIssueCreateErrors() ).toBeNull();
  } );

  it( "Add/Remove issue status create listeners", function() {
    var
      payloadCreateStart = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.ISSUE_CREATE_START
        }
      },
      payloadCreateSuccess = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.ISSUE_CREATE_SUCCESS,
          data: {
            id: 12,
            title: "New issue"
          }
        }
      },
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction();

    IssueStore.addIssueCreateStatusChangedListener( firstListener );
    IssueStore.addIssueCreateStatusChangedListener( secondListener );

    callback( payloadCreateStart );

    IssueStore.removeIssueCreateStatusChangedListener( secondListener );

    callback( payloadCreateSuccess );

    expect( firstListener.mock.calls.length ).toEqual( 2 );
    expect( secondListener.mock.calls.length ).toEqual( 1 );
  });
});