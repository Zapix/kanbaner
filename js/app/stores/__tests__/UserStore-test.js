jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../UserStore" );
jest.dontMock( "object-assign" );

describe( "UserStore", function() {

  var
    callback,
    KanbanerDispatcher,
    UserStore,
    KanbanerConstants = require( "../../constants/KanbanerConstants" ),
    PayloadSources = KanbanerConstants.PayloadSources,
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    UserStore = require( "../UserStore" );
    callback = KanbanerDispatcher.register.mock.calls[0][0];

  });

  it( "check user login success", function() {
    var
      user,
      token,
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.USER_LOGIN_SUCCESS,
          user: {
            login: "Zapix",
            avatar_url: "https://github.com/images/123123"
          },
          token: "sometokenvalue"
        }
      };

    callback( payload );

    expect( UserStore.isUserLoggedIn() ).toEqual( true );

    user = UserStore.getUser();
    token = UserStore.getToken();

    expect( user.login ).toEqual( "Zapix" );
    expect( token ).toEqual( "sometokenvalue" );

  });

  it( "Add/remove user logged in listener", function() {
    var
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction(),
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.USER_LOGIN_SUCCESS,
          user: {
            login: "Zapix",
            avatar_url: "https://github.com/images/123123"
          },
          token: "sometokenvalue"
        }
      };

    UserStore.addUserLoggedInListener( firstListener );
    UserStore.addUserLoggedInListener( secondListener );

    callback( payload );

    expect( firstListener ).toBeCalled();
    expect( secondListener ).toBeCalled();

    UserStore.removeUserLoggedInListener( secondListener );

    callback( payload );
    expect( firstListener.mock.calls.length ).toEqual( 2 );
    expect( secondListener.mock.calls.length ).toEqual( 1 );
  });

  it( "check user login failed", function() {
    var
      user,
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.USER_LOGIN_FAIL
        }
      };

    callback( payload );

    expect( UserStore.isUserLoggedIn() ).toEqual( false );

    user = UserStore.getUser();

    expect( user ).toBeFalsy();
  });

  it( "Add/remove user authentication failed listener", function() {
    var
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction(),
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.USER_LOGIN_FAIL
        }
      };

    UserStore.addAuthenticationFailedListener( firstListener );
    UserStore.addAuthenticationFailedListener( secondListener );

    callback( payload );

    expect( firstListener ).toBeCalled();
    expect( secondListener ).toBeCalled();

    UserStore.removeAuthenticationFailedListener( secondListener );

    callback( payload );
    expect( firstListener.mock.calls.length ).toEqual( 2 );
    expect( secondListener.mock.calls.length ).toEqual( 1 );
  });

  it( "check user logout ", function() {
    var
      user,
      token,
      loginPayload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.USER_LOGIN_SUCCESS,
          user: {
            login: "Zapix",
            avatar_url: "https://github.com/images/123123"
          },
          token: "sometokenvalue"
        }

      },
      logoutPayload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.USER_LOGOUT
        }
      };

    callback( loginPayload );

    expect( UserStore.isUserLoggedIn() ).toEqual( true );

    callback( logoutPayload );

    expect( UserStore.isUserLoggedIn() ).toEqual( false );

    user = UserStore.getUser();
    token = UserStore.getToken();

    expect( user ).toBeFalsy();
    expect( token ).toBeFalsy();

  });

  it( "Add/remove user logout listener", function() {
    var
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction(),
      loginPayload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.USER_LOGIN_SUCCESS,
          user: {
            login: "Zapix",
            avatar_url: "https://github.com/images/123123"
          },
          token: "sometokenvalue"
        }

      },
      logoutPayload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.USER_LOGOUT
        }
      };


    UserStore.addUserLoggedOutListener( firstListener );
    UserStore.addUserLoggedOutListener( secondListener );

    callback( loginPayload );
    callback( logoutPayload );

    expect( firstListener ).toBeCalled();
    expect( secondListener ).toBeCalled();

    UserStore.removeUserLoggedOutListener( secondListener );

    callback( loginPayload );
    callback( logoutPayload );

    expect( firstListener.mock.calls.length ).toEqual( 2 );
    expect( secondListener.mock.calls.length ).toEqual( 1 );
  });
});





