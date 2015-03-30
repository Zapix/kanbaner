var
  React = require( "react" ),
  Router = require( "react-router" ),
  DefaultRoute = Router.DefaultRoute,
  Route = Router.Route,
  Redirect = Router.Redirect,

  KanbanerApp = require( "./components/KanbanerApp.react" ),
  LoginForm = require( "./components/LoginForm.react" ),
  About = require( "./components/About.react" ),
  UserPanel = require( "./components/UserPanel.react" ),
  RepositoryList = require( "./components/RepositoryList.react" ),
  RepositoryDetail = require( "./components/RepositoryDetail.react" ),
  Profile = require( "./components/Profile.react" ),

  routes = (
    <Router name="app" path="/" handler={KanbanerApp}>
      <DefaultRoute handler={LoginForm} />
      <Redirect from="/login" to="app" />
      <Route name="about" handler={About} />
      <Route name="user-panel" handler={UserPanel}>
        <DefaultRoute handler={RepositoryList} />
        <Route name="profile" handler={Profile} />
        <Router name="repository-detail" path=":repositoryOwner/:repositoryName" handler={RepositoryDetail} />
      </Route>
    </Router>
  );

module.exports = routes;
