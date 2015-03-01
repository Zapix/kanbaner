var React = require('react');

var Navigation = require('./Navigation.react');
var MainSection = require("./MainSection.react");
var Footer = require('./Footer.react');

var KanbanerApp = React.createClass({
  render: function() {
    return (
      <div>
        <Navigation/>
        <MainSection/>
        <Footer/>
      </div>
    );
  }
});

module.exports = KanbanerApp;
