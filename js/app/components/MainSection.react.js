var React = require("react");

var LoginForm = require("./LoginForm.react");


var MainSection = React.createClass({
  render: function() {

    return (
      <div className="main-section">
        <LoginForm/>
      </div>
    )
  }
});

module.exports = MainSection;
