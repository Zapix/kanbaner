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

  it( "Add/remove repository list load success listeners", function() {
    var
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction(),
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

    RepositoryStore.addRepositoryListChangedListener( firstListener );
    RepositoryStore.addRepositoryListChangedListener( secondListener );

    callback( payload );

    expect( firstListener ).toBeCalled();
    expect( secondListener ).toBeCalled();

    RepositoryStore.removeRepositoryListChangedListener( secondListener );

    callback( payload );

    expect( firstListener.mock.calls.length ).toEqual( 2 );
    expect( secondListener.mock.calls.length ).toEqual( 1 );
  });

  it( "Repository list load failed", function() {
    var
      repositoryList,
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.REPOSITORIES_LOAD_FAIL
        }
      };

    callback( payload );
    repositoryList = RepositoryStore.getRepositoryList();

    expect( repositoryList.length ).toBe( 0 );
  });

  it( "Add remove list load failed listeners ", function() {
    var
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction(),
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.REPOSITORIES_LOAD_FAIL
        }
      };

    RepositoryStore.addRepositoryListChangeFailedListener( firstListener );
    RepositoryStore.addRepositoryListChangeFailedListener( secondListener );

    callback( payload );

    expect( firstListener ).toBeCalled();
    expect( secondListener ).toBeCalled();

    RepositoryStore.removeRepositoryListChangeFailedListener( secondListener );

    callback( payload );

    expect( firstListener.mock.calls.length ).toEqual( 2 );
    expect( secondListener.mock.calls.length ).toEqual( 1 );
  });

  it( "Repository selected success", function() {
    var
      repository,
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.REPOSITORY_SELECT_SUCCESS,
          data: {
            id: 1
          }
        }
      };

    callback( payload );

    repository = RepositoryStore.getSelectedRepository();

    expect(repository.id).toBe( 1 );
  });

  it( "Add/remove select listeners", function() {
    var
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction(),
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.REPOSITORY_SELECT_SUCCESS,
          data: {
            id: 1
          }
        }
      };

    RepositoryStore.addRepositorySelectedListener( firstListener );
    RepositoryStore.addRepositorySelectedListener( secondListener );
    callback( payload );

    expect( firstListener ).toBeCalled();
    expect( secondListener ).toBeCalled();

    RepositoryStore.removeRepositorySelectedListener( secondListener );

    callback( payload );

    expect( firstListener.mock.calls.length ).toEqual( 2 );
    expect( secondListener.mock.calls.length ).toEqual( 1 );
  });

  it( "Repository select failed", function() {
    var
      repository,
      listener = jest.genMockFunction(),
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.REPOSITORY_SELECT_FAIL
        }
      };

    RepositoryStore.addRepositorySelectFailedListener(
      listener
    );
    callback( payload );

    repository = RepositoryStore.getSelectedRepository();

    expect( repository ).toBeFalsy();
    expect( listener ).toBeCalled();

  });

  it( "Add/remove select failed listeners", function() {
    var
      repository,
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction(),
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.REPOSITORY_SELECT_FAIL
        }
      };

    RepositoryStore.addRepositorySelectFailedListener( firstListener );
    RepositoryStore.addRepositorySelectFailedListener( secondListener );
    callback( payload );

    repository = RepositoryStore.getSelectedRepository();

    expect( repository ).toBeFalsy();
    expect( firstListener ).toBeCalled();
    expect( secondListener ).toBeCalled();

    RepositoryStore.removeRepositorySelectFailedListener( secondListener );

    callback( payload );

    expect( firstListener.mock.calls.length ).toEqual( 2 );
    expect( secondListener.mock.calls.length ).toEqual( 1 );
  });

});