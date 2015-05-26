jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../IssueActions" );
jest.dontMock( "../LoaderActions" );
jest.dontMock( "q" );
jest.dontMock( "btoa" );
jest.dontMock( "keymirror");


describe( "IssueActions", function() {
  var
    $,
    Q,
    KanbanerDispatcher,
    GithubResource,
    IssueActions,
    KanbanerConstants = require( "../../constants/KanbanerConstants" ),
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    Q = require( "q" );
    $ = require( "jquery" );
    GithubResource = require( "../../resources/GithubResource" );
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    IssueActions = require( "../IssueActions" );
  });

  it( "Get issue list success with one request", function() {
    GithubResource.getRepositoryIssues = jest.genMockFunction();
    GithubResource.getRepositoryIssues.mockReturnValue(Q({
      data: [],
      meta: null
    }));

    IssueActions.getIssueList( "tokenvalue", "github/repository" )
      .then(function() {
        expect( GithubResource.getRepositoryIssues.calls.length ).toEqual( 2 );
      });
  });

  it( "Load 2 times opened  issues", function() {
    GithubResource.getRepositoryIssues = jest
      .genMockFunction()
      .mockImplementation(function(token, repositoryFullName, state, page) {
        if( state == 'open' && page == 1) {
          return Q({
            data: [
              {id: 1},
              {id: 2}
            ],
            meta: {
              next: {
                page: 2
              }
            }
          });
        }

        if ( state == 'open' ) {
          return Q({
            data: [
              {id: 3},
              {id: 4}
            ]
          })
        }

        return Q({
          data: []
        });
      });

    IssueActions.getIssueList( "tokenvalue", "github/repository" )
      .then(function() {
        expect( GithubResource.getRepositoryIssues.mock.calls.length )
          .toEqual( 3 );
      });
  });

  it( "Clear issues ", function() {
    IssueActions.clearIssues()
      .then(function() {
        expect( KanbanerDispatcher.handleViewAction ).toBeCalled();
      });
  });

  it( "Create issue success", function() {
    GithubResource.createIssue = jest
      .genMockFunction()
      .mockReturnValue(Q({
        status: 201,
        data: {
          id: 12,
          title: "New issue"
        }
      }));

    IssueActions.createIssue(
      "sometoken ",
      "github/repository",
      {
        title: "My title",
        description: "This is a description",
        assignee: ""
      }
    )
      .then(function() {
        var
          issueCreateStartCalls = KanbanerDispatcher.handleViewAction.mock.calls
            .filter(function( call ) {
              return call[0].type == ActionTypes.ISSUE_CREATE_START;
            }),
          issueCreateSuccessCalls = KanbanerDispatcher.handleViewAction.mock.calls
            .filter(function( call ) {
              return call[0].type == ActionTypes.ISSUE_CREATE_SUCCESS;
            });

        expect( issueCreateStartCalls.length ).toEqual( 1 );
        expect( issueCreateSuccessCalls.length ).toEqual( 1 );
      });


  });

  it( "Create issue data error", function() {
    GithubResource.createIssue = jest
      .genMockFunction()
      .mockReturnValue(Q({
        status: 422,
        data: {
          title: "Required field"
        }
      }));

    IssueActions.createIssue(
      "sometokenvalue",
      "github/repository",
      {
        description: "Issue without title"
      }
    )
      .then(function() {
        var
          issueCreateStartCalls = KanbanerDispatcher.handleViewAction.calls
            .filter(function( call ) {
              return call[0].type == ActionTypes.ISSUE_CREATE_START;
            }),
          issueCreateFailCalls = KanbanerDispatcher.handleViewAction.calls
            .filter(function( call ) {
              return call[0].type == ActionTypes.ISSUE_CREATE_FAIL;
            });

        expect( issueCreateStartCalls.length ).toEqual( 1 );
        expect( issueCreateFailCalls.length ).toEqual( 1 );
      });
  });

  it( "Create issue handle external error", function() {
    GithubResource.createIssue = jest
      .genMockFunction()
      .mockReturnValue(Q({
        status: 500,
        data: {}
      }));

    IssueActions.createIssue(
      "sometokenvalue",
      "github/repository",
      {
        "title": "New issue",
        "description": "This is important"
      }
    )
      .then(function() {
        var
          issueCreateStartCalls = KanbanerDispatcher.handleViewAction.calls
            .filter(function( call ) {
              return call[0].type == ActionTypes.ISSUE_CREATE_START;
            }),
          issueCreateErrorCalls = KanbanerDispatcher.handleViewAction.calls
            .filter(function( call ) {
              return call[0].type == ActionTypes.ISSUE_CREATE_ERROR;
            });

        expect( issueCreateStartCalls.length ).toEqual( 1 );
        expect( issueCreateErrorCalls.length ).toEqual( 1 );
      });
  });

  it( "Clear last issue create attempt", function() {
    IssueActions.issueCreateClear()
    .then(function() {
        var
          issueCreateClearCalls = KanbanerDispatcher.handleViewAction.calls
            .filter(function( call ) {
              return call[0].type == ActionTypes.ISSUE_CREATE_CLEAR;
            });

        expect( issueCreateClearCalls.length ).toEqual( 1 );
      });
  });
} );