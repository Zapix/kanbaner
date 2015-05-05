var
  React = require( "react" ),
  Router = require( "react-router" ),
  routes = require("./routes");

Router.run( routes, function(Handler, state) {
  React.render(
    <Handler params={state.params} />,
    document.getElementById('app')
  );
});
