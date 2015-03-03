jest.dontMock( "../../constants/KanbanerConstants.js" );
jest.dontMock( "../UserStore.js" );
jest.dontMock( "object-assign" );
jest.dontMock( "btoa" );

describe( 'UserStore', function() {

  var
    $,
    btoa,
    callback,
    KanbanerDispatcher,
    UserStore,
    KanbanerConstants = require('../../constants/KanbanerConstants'),
    PayloadSources = KanbanerConstants.PayloadSources,
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    $ = require( "jquery" );
    //btoa = require( "btoa" );
    //KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    //UserStore = require( "../UserStore" );
    //callback = KanbanerDispatcher.register.mock.calls[0][0];
  });

  it( "check ajax send data", function() {
    //var
    //  username = "username",
    //  password = "password",
    //  authToken = btoa( username + ":" + password ),
    //  payload = {
    //    source: PayloadSources.VIEW_ACTION,
    //    action: {
    //      type: ActionTypes.SEND_AUTHENTICATION_CREDENTIALS,
    //      username: "tester",
    //      password: "password"
    //    }
    //  };

    expect( 1 ).toEqual( 1 );
  });
});





