jest.dontMock( "../../constants/KanbanerConstants" );
jest.dontMock( "../CollaboratorStore" );
jest.dontMock( "object-assign" );


describe( "CollaboratorStore", function() {
  var
    callback,
    KanbanerDispatcher,
    CollaboratorStore,
    KanbanerConstants = require( "../../constants/KanbanerConstants" ),
    PayloadSources = KanbanerConstants.PayloadSources,
    ActionTypes = KanbanerConstants.ActionTypes;

  beforeEach(function() {
    KanbanerDispatcher = require( "../../dispatcher/KanbanerDispatcher" );
    CollaboratorStore = require( "../CollaboratorStore" );
    callback = KanbanerDispatcher.register.mock.calls[0][0];
  });

  it( "check collaborator set succeess", function() {
    var
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.COLLABORATORS_LOAD_SUCCESS,
          data: [
            {id: 1},
            {id: 2}
          ]
        }
      };

    callback( payload );

    expect( CollaboratorStore.getCollaboratorList().length ).toEqual( 2 )
  });

  it( "Check collaborator reset", function() {
    var
      payloadFirst = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.COLLABORATORS_LOAD_SUCCESS,
          data: [
            {id: 1},
            {id: 2}
          ]
        }
      },
      payloadSecond = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.COLLABORATORS_LOAD_SUCCESS,
          data: [
            {id: 2},
            {id: 5},
            {id: 8}
          ]
        }
      };

    callback( payloadFirst );
    callback( payloadSecond );

    expect( CollaboratorStore.getCollaboratorList().length ).toEqual( 3 );
  });

  it( "Check clear collaborator list", function() {
    var
      payloadSet = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.COLLABORATORS_LOAD_SUCCESS,
          data: [
            {id: 1},
            {id: 2}
          ]
        }
      },
      payloadClear = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.COLLABORATORS_CLEAR
        }
      };

    callback( payloadSet );
    callback( payloadClear );

    expect( CollaboratorStore.getCollaboratorList().length ).toEqual( 0 );
  });

  it( "Add/Remove collaborator list changed listeners", function() {
    var
      firstListener = jest.genMockFunction(),
      secondListener = jest.genMockFunction(),
      payload = {
        source: PayloadSources.VIEW_ACTION,
        action: {
          type: ActionTypes.COLLABORATORS_LOAD_SUCCESS,
          data: [
            {id: 1},
            {id: 2}
          ]
        }
      };

    CollaboratorStore.addCollaboratorListChangedListener( firstListener );
    CollaboratorStore.addCollaboratorListChangedListener( secondListener );

    callback( payload );

    CollaboratorStore.removeCollaboartorListChangedListener( secondListener );

    callback( payload );

    expect( firstListener.mock.calls.length ).toEqual( 2 );
    expect( secondListener.mock.calls.length ).toEqual( 1 );
  });
});
