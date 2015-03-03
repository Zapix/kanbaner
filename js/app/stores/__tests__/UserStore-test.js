jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../UserStore" );
jest.dontMock( "object-assign" );
jest.dontMock( "q" );

describe( 'UserStore', function() {

  var
    Q,
    $,
    btoa,
    callback,
    KanbanerDispatcher,
    UserStore,
    KanbanerConstants = require('../../constants/KanbanerConstants'),
    PayloadSources = KanbanerConstants.PayloadSources,
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    Q = require("q");
    $ = require("jquery");
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    btoa = require( "btoa" );
    UserStore = require( "../UserStore" );
    callback = KanbanerDispatcher.register.mock.calls[0][0];

  });

  it( "check user authenticated", function() {
    var
      username = "username",
      password = "password",
      authToken = btoa( username + ":" + password ),
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.SEND_AUTHENTICATION_CREDENTIALS,
          username: "tester",
          password: "password"
        }
      };

    callback( payload );

    expect( $.ajax ).toBeCalled();
  });
});





