var
  React = require( "react" ),

  Breadcrumbs = React.createClass({
    render: function() {
      return (
        <div className="row app-breadcrumbs">
          <div className="large-12 small-12 medium-12 columns">
            <nav className="breadcrumbs">
              {this.props.children}
            </nav>
          </div>
        </div>
      );
    }
  });

module.exports = Breadcrumbs;