var React = require('react');

var LoginForm = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="large-6 large-centered medium-6 medium-centered small12 columns">
          <form>
            <div className="row">
              <div class="large-12 medium-12 small-12">
                <h4 className="text-center">
                  Login with github:
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="large-2 medium-2 small-3 columns">
                <label htmlFor="username" className="right inline">
                  Username
                </label>
              </div>
              <div className="large-10 medium-10 small-9 columns">
                <input
                  type="text"
                  id="username"
                  placeholder="Github username"
                />
              </div>
            </div>
            <div className="row">
              <div className="large-2 medium-2 small-3 columns">
                <label htmlFor="password" className="right inline">
                  Password
                </label>
              </div>
              <div className="large-10 medium-10 small-9 columns">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="row">
              <div className="large-6 large-centered medium-8 medium-centered small-12 columns">
                <button type="submit" className="button expand">Log in</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = LoginForm;
