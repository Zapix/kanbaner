jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../CollaboratorActions" );
jest.dontMock( "q" );
jest.dontMock( "btoa" );
jest.dontMock( "keymirror" );


describe( "CollaboratorActions", function() {
  var
    $,
    Q,
    KanbanerDispatcher,
    GithubResource,
    CollaboratorActions,
    KanbanerConstants = require( "../../constants/KanbanerConstants" ),
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    Q = require( "q" );
    $ = require( "jquery" );
    GithubResource = require( "../../resources/GithubResource" );
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    CollaboratorActions = require( "../CollaboratorActions" );
  });

  it( "Get collaborators list success in one request", function() {
    GithubResource.getRepositoryCollaborators= jest.genMockFunction();
    GithubResource.getRepositoryCollaborators.mockReturnValue(Q({
      data: [{id:1}, {id: 2}],
      meta: null
    }));

    CollaboratorActions.getCollaboratorList(
      "tokenvalue",
      "github/repository"
    )
      .then(function( data ) {
        expect( data.length ).toEqual( 2 )
        expect( GithubResource.getRepositoryCollaborators.calls.length )
          .toEqual( 1 );
      });
  } );

  it( "Get collaborators list success in 2 request", function() {
    GithubResource.getRepositoryCollaborators = jest
      .genMockFunction()
      .mockImplementation(function( token, repositoryFullName, page) {
        if( page == 1 ) {
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
          })
        }

        return Q({
          data: [
            {id: 3},
            {id: 4}
          ]
        });
      });

    CollaboratorActions.getCollaboratorList( "token", "github/repository" )
      .then(function( data ) {
        expect( data.length ).toEqual( 4 );
        expect( GithubResource.getRepositoryCollaborators.calls.length )
          .toEqual( 2 );
      });
  });

  it( "Check sending clear collaborators action", function() {
    CollaboratorActions.clearCollaborators().then(function() {
      expect( KanbanerDispatcher.handleViewAction ).toBeCalled();
    });
  });
} );