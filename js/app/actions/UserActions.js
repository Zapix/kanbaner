var KanbanerDispatcher = require('../dispatcher/KanbanerDispatcher');
var KanbanerConstants = require('../constants/KanbanerConstants');

var ActionTypes = KanbanerConstants.ActionTypes;

var UserActions = {
  /**
   * @param {string} username
   * @param {string} password
   */
  sendAuthCredentials: function(username, password) {
    KanbanerDispatcher.handleViewAction({
      type: ActionTypes.SEND_AUTHENTICATION_CREDENTIALS,
      username: username,
      password: password
    });
  },

  logoutUser: function() {
    KanbanerDispatcher.handleViewAction({
      type: ActionTypes.USER_LOGOUT
    });
  }
};

module.exports = UserActions;
