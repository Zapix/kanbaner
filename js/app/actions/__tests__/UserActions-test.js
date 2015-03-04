jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../UserActions" );
jest.dontMock( "q" );
jest.dontMock( "btoa" );
jest.dontMock( "keymirror" );

describe( "UserActions", function() {
  var
    $,
    KanbanerDispatcher,
    UserActions,
    KanbanerConstants = require( "../../constants/KanbanerConstants" ),
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    Q = require( "q" );
    $ = require( "jquery" );
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    UserActions = require( "../UserActions" );
  });

  it( "Send authentication success", function() {
    $.ajax = jest.genMockFunction();

    $.ajax.mockReturnValue( Q({
      token: "sometokenvalue",
      user: {
        login: "Zapix",
        id: 31337
      }
    }) );

    return UserActions.sendAuthCredentials( "Zapix", "123123" )
      .then(function( value ) {
        var
          returnValue;

        expect( $.ajax ).toBeCalled();

        expect( KanbanerDispatcher.handleViewAction ).toBeCalled();

        returnValue = KanbanerDispatcher.handleViewAction.mock.calls[0][0];

        expect( returnValue.type ).toEquals( ActionTypes.USER_LOGIN_SUCCESS );
        expect( returnValue.user ).toBeTruthy();
        expect( returnValue.user.login ).toEqual( "Zapix" );

      });
  });

  pit( "Send authentication fail", function() {
    $.ajax = jest.genMockFunction();

    $.ajax.mockReturnValue( Q.reject("Failed") );

    return UserActions.sendAuthCredentials( "Zapix", "123123" )
      .then(function( value ) {
        var
          returnValue;
        expect( $.ajax ).toBeCalled();

        expect( KanbanerDispatcher.handleViewAction ).toBeCalled();

        returnValue = KanbanerDispatcher.handleViewAction.mock.calls[0][0];

        expect( returnValue.type ).toEqual( ActionTypes.USER_LOGIN_FAIL );
      });
  });

  it( "Send logout", function() {
    UserActions.logoutUser()
      .then(function( value ) {
        var
          returnValue;

        expect( KanbanerDispatcher.handleViewAction ).toBeCalled();

        returnValue = KanbanerDispatcher.handleViewAction.mock.calls[0][0];

        expect( returnValue.type ).toEqual( ActionTypes.USER_LOGOUT );
      });

  });
});