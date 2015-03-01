var React = require('react');


var Navigation = React.createClass({
  /**
   * Render navigation panel
   * @returns {XML}
   */
  render: function() {
    return(
      <nav className="top-bar" data-topbar role="navigation">
        <ul className="title-area">
          <li className="name">
            <h1><a href="#">Kanbaner</a></h1>
          </li>
          <li className="toggle-topbar menu-icon">
            <a href="#">
              <span>Menu</span>
            </a>
          </li>
        </ul>

        <section className="top-bar-section">
          <ul className="right">
            <li><a href="#">Main</a></li>
            <li><a rhef="#">About</a></li>
          </ul>
        </section>
      </nav>
    )
  }
});

module.exports = Navigation;
