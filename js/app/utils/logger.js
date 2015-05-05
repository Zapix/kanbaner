var
  /**
   * logger class with debug, info, warning, error log functions
   * @param {string} loggerName
   */
  Logger = function(loggerName) {
    this.loggerName = loggerName;
  };

Logger.prototype = {
  /**
   *
   * @param {string} logStatus: status of logging (debug, info, warning, error)
   * @param {array} args multiple list of args
   * @private
   */
  _log: function(logStatus, ...args) {
    console.log(
      "[" + this.loggerName +  ":" + logStatus + "]", ...args
    );
  },

  debug: function(...args) {
    this._log("debug", ...args);
  },

  info: function(...args) {
    this._log("info", ...args);
  },

  warning: function(...args) {
    this._log("warning", ...args);
  },

  error: function(...args) {
    this._log("error", ...args)
  }
};

module.exports = Logger;

