var React = require('react');

var UserNavigation = React.createClass({
  propsTypes: {
    user: React.PropTypes.object.isRequired,
    onLogoutClicked: React.PropTypes.func.isRequired
  },

  render: function() {
    var user = this.props.user;
    var onLogoutClicked = this.props.onLogoutClicked;

    return (
      <li className="has-dropdown">
        <a href="#">
          <img className="menuicon" src={user.avatar_url}/>&nbsp;
          {user.login}
        </a>
        <ul className="dropdown">
          <li><a href="#" onClick={onLogoutClicked}>Log out</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
      </li>
    );
  }
});

module.exports = UserNavigation;
