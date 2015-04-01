var assign = require( "object-assign" );
var Dispatcher = require( "flux" ).Dispatcher;

var KanbanerConstants = require( "../constants/KanbanerConstants" );

var PayloadSources = KanbanerConstants.PayloadSources;


var KanbanerDispatcher = assign(new Dispatcher(), {
  /**
   * Send action that comes from view
   * @param {object} action
   */
  handleViewAction: function(action){
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = KanbanerDispatcher;
