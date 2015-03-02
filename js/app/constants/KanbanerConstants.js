var keyMirror = require('keymirror');

var KanbanerConstants = {
  ActionTypes: keyMirror({
    SEND_AUTHENTICATION_CREDENTIALS: null,
    USER_LOGIN: null,
    USER_LOGOUT: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    GITHUB_ACTION: null
  })
};

module.exports = KanbanerConstants;
