// AS PER https://github.com/facebook/jest/issues/114
// Provides various polyfills during testing.
require('babel/polyfill');

var fs = require('fs');
var sms = require("source-map-support");

// I couldn't find an obvious way to get source-map-support working with inline source maps.
// So we write the maps to the file system in preprocessor, then read them during the `test framework setup` stage.
var map_path = function(string) {
  return '/tmp/' + require('crypto').createHash('md5').update(string).digest('hex') + '.map';
};

sms.install({
  retrieveSourceMap: function(source) {
    var map;

    try {
      map = fs.readFileSync(map_path(source), 'utf8');
    } catch (err) {
      return;
    }

    return map ? {
      url: undefined,
      map: map
    } : undefined ;
  }
});
