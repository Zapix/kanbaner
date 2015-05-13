var keyMirror = require('keymirror');

var KanbanerConstants = {
  ActionTypes: keyMirror({
    USER_LOGIN_SUCCESS: null,
    USER_LOGIN_FAIL: null,
    USER_LOGOUT: null,

    REPOSITORIES_LOAD_SUCCESS: null,
    REPOSITORIES_LOAD_FAIL: null,

    REPOSITORY_SELECT_SUCCESS: null,
    REPOSITORY_SELECT_FAIL: null,
    REPOSITORY_SELECT_CLEAR: null,

    ISSUES_CLEAR: null,
    ISSUES_LOAD_SUCCESS: null,
    ISSUES_LOAD_FAIL: null,

    COLLABORATORS_CLEAR: null,
    COLLABORATORS_LOAD_SUCCESS: null,

    LOADER_SHOW: null,
    LOADER_HIDE: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null
  })
};

module.exports = KanbanerConstants;
