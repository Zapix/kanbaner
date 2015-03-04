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

    expect( user.login ).toEqual( "Zapix" );

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

  it( "check user logout ", function() {
    var
      user,
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

    expect( user ).toBeFalsy();
  });
});





