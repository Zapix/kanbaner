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

  it( "Get repository list success with one request", function() {
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
        expect( GithubResource.getRepositoryIssues.calls.length ).toEqual( 2 );
      });
  });

  it( "Clear issues ", function() {
    IssueActions.clearIssues()
      .then(function() {
        expect( KanbanerDispatcher.handleViewAction ).toBeCalled();
      });
  });
} );