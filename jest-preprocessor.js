var
  babel = require( "babel" ),
  fs = require( "fs" ),
  ReactTools = require( "react-tools" );

// setup source mapping as per https://github.com/facebook/jest/issues/114
var map_path = function(string) {
  return "/tmp/" + require( "crypto" ).createHash( "md5" ).update(string).digest( "hex" ) + ".map";
};

module.exports = {
  process: function (src, filename) {
    if (filename.indexOf( "node_modules" ) !== -1 || filename.indexOf( "bower_components" ) !== -1) {
      return src;
    }

    if (babel.canCompile(filename)) {
      // Force inclusion of the polyfill, then append regular compiled output.
      var compiled = babel.transform(src, { filename: filename, sourceMap: true });
      var result = compiled.code;

      fs.writeFileSync(map_path(filename), JSON.stringify(compiled.map));

      return ReactTools.transform(result, {harmony: true});
    }

    return ReactTools.transform(src, {harmony: true});
  }
};
