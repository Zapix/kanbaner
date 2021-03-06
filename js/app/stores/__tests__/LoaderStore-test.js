jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../LoaderStore" );
jest.dontMock( "object-assign" );


describe( "LoaderStore", function() {
  var
    callback,
    KanbanerDispatcher,
    LoadStore,
    KanbanerConstants = require( "../../constants/KanbanerConstants" );
    PayloadSources = KanbanerConstants.PayloadSources,
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher");
    LoadStore = require( "../LoaderStore" );
    callback = KanbanerDispatcher.register.mock.calls[0][0];
  });

  it( "check show loader", function() {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: {
        type: ActionTypes.LOADER_SHOW
      }
    };
    callback( payload );
    expect( LoadStore.getLoader() ).toBeTruthy();
  });

  it( "check show loader", function() {
    var
      payloadShow = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.LOADER_SHOW
        }
      },
      payloadHide = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.LOADER_HIDE
        }
      };

    callback(payloadShow);
    expect(LoadStore.getLoader()).toBeTruthy();

    callback(payloadHide);
    expect(LoadStore.getLoader()).toBeFalsy();
  });

  it( "Add remove loader change listeners", function() {
    var
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction(),
      payloadShow = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.LOADER_SHOW
        }
      },
      payloadHide = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.LOADER_HIDE
        }
      };

    LoadStore.addLoaderListener( firstListener );
    LoadStore.addLoaderListener( secondListener );

    callback( payloadShow );

    expect( firstListener ).toBeCalled();
    expect( secondListener ).toBeCalled();

    LoadStore.removeLoaderListener( secondListener );

    callback( payloadHide );

    expect( firstListener.mock.calls.length ).toEqual( 2 );
    expect( secondListener.mock.calls.length ).toEqual( 1 );
  });
});