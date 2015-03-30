jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../RepositoryStore" );
jest.dontMock( "object-assign" );


describe( "LoadStore", function() {
  var
    callback,
    KanbanerDispatcher,
    RepositoryStore,
    KanbanerConstants = require( "../../constants/KanbanerConstants" ),
    PayloadSources = KanbanerConstants.PayloadSources,
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    RepositoryStore = require( "../RepositoryStore" ) ;
    callback = KanbanerDispatcher.register.mock.calls[0][0];
  });

  it( "Repository list load success", function() {
    var
      repositoryList,
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.REPOSITORIES_LOAD_SUCCESS,
          data: [
            {
              id: 324
            },
            {
              id: 325
            }
          ]
        }
      };

    callback( payload );

    repositoryList = RepositoryStore.getRepositoryList();

    expect( repositoryList.length ).toBe( 2 );
  });

  it( "Repository list load failed", function() {

  });

});