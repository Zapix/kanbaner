jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../../resources/GithubResource" );
jest.dontMock( "../RepositoryActions" );
jest.dontMock( "../LoaderActions" );
jest.dontMock( "q" );
jest.dontMock( "btoa" );
jest.dontMock( "keymirror" );


describe( "RepositoryActions", function() {
  var
    $,
    Q,
    KanbanerDispatcher,
    RepositoryActions,
    KanbanerConstants = require( "../../constants/KanbanerConstants" ),
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    Q = require( "q" );
    $ = require( "jquery" );
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    RepositoryActions = require( "../RepositoryActions" );
  });

  it( "Get repository list success", function() {
    $.ajax = jest.genMockFunction();

    $.ajax.mockReturnValue( Q([
      {
        id: 1,
        full_name: "zapix/kanbanner"
      },
      {
        id: 2,
        full_name: "zapix/zapix.github.io"
      },
      {
        id: 3,
        full_name: "octocat/hello-world"
      }
    ]) );

    RepositoryActions.requestRepositoryList( "tokenvalue" )
      .then(function() {
        var
          callCount;

        expect( $.ajax ).toBeCalled();

        expect( KanbanerDispatcher.handleViewAction ).toBeCalled();

        callCount = KanbanerDispatcher.handleViewAction.mock.calls.filter(
          function( call ) {
            return call[0].type == ActionTypes.REPOSITORIES_LOAD_SUCCESS
          }
        );

        expect( callCount.length ).toEqual( 1 );
      });
  });

  it( "Send request repository list failed", function() {
    $.ajax = jest.genMockFunction();

    $.ajax.mockReturnValue( Q.reject( "Failed" ) );

    RepositoryActions.requestRepositoryList( "tokenvalue" )
      .then(function() {
        var
          callCount;

        expect( $.ajax ).toBeCalled();

        expect( KanbanerDispatcher.handleViewAction ).toBeCalled();

        callCount = KanbanerConstants.handleViewAction.mock.calls.filter(
          function( call ) {
            return call[0].type == ActionTypes.REPOSITORIES_LOAD_FAIL
          }
        );

        expect( callCount.length ).toEqual( 1 );
      });
  });

  it( "Select repository from loaded repository list", function() {
    $.ajax = jest.genMockFunction();

    RepositoryActions.requestRepositoryDetail(
      "sometoken",
      "zapix/kanbaner",
      [
        {
          id: 1,
          full_name: "octocat/hello-world"
        },
        {
          id: 2,
          full_name: "zapix/kanbaner"
        },
        {
          id: 3,
          full_name: "zapix/another-repository"
        }
      ]
    )
      .then(function() {
        var
          callCount;

        expect( $.ajax ).not.toBeCalled();

        expect( KanbanerDispatcher.handleViewAction ).toBeCalled();

        callCount = KanbanerDispatcher.handleViewAction.mock.calls.filter(
          function( call ) {
            return call[0].type == ActionTypes.REPOSITORY_SELECT_SUCCESS
          }
        );

        expect( callCount.length ).toEqual( 1 );
      });
  });

  it( "Select repository from github server", function() {
    $.ajax = jest.genMockFunction();

    $.ajax.mockReturnValue( Q({
      id: 2,
      full_name: "zapix/kanbaner"
    }) );

    RepositoryActions.requestRepositoryDetail(
      "sometoken",
      "zapix/kanbaner",
      [
        {
          id: 1,
          full_name: "octocat/hello-world"
        },
        {
          id: 3,
          full_name: "zapix/another-repository"
        }
      ]
    )
      .then(function() {
        var
          callCount;

        expect( $.ajax ).toBeCalled();

        expect( KanbanerDispatcher.handleViewAction ).toBeCalled();

        callCount = KanbanerDispatcher.handleViewAction.mock.calls.filter(
          function( call ) {
            return call[0].type == ActionTypes.REPOSITORY_SELECT_SUCCESS
          }
        );

        expect( callCount.length ).toEqual( 1 );
      });
  });

  it( "Can't select repository.", function() {
    $.ajax = jest.genMockFunction();

    $.ajax.mockReturnValue( Q.reject( "failed" ) );

    RepositoryActions.requestRepositoryDetail(
      "sometoken",
      "zapix/kanbaner",
      [
        {
          id: 1,
          full_name: "octocat/hello-world"
        },
        {
          id: 3,
          full_name: "zapix/another-repository"
        }
      ]
    ).then(function() {
        var
          callsCount;

        expect( $.ajax ).toBeCalled();

        expect( KanbanerDispatcher.handleViewAction).toBeCalled();

        callsCount = KanbanerDispatcher.handleViewAction.mock.calls.filter(
          function( call ) {
            return call[0].type == ActionTypes.REPOSITORY_SELECT_FAIL;
          }
        );

        expect( callsCount.length ).toEqual( 1 );
      });
  });
});
