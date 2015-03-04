var keyMirror = require('keymirror');

var KanbanerConstants = {
  ActionTypes: keyMirror({
    USER_LOGIN_SUCCESS: null,
    USER_LOGIN_FAIL: null,
    USER_LOGOUT: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null
  })
};

module.exports = KanbanerConstants;
