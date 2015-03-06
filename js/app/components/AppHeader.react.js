var
  React = require( "react" ),
  PropTypes = React.PropTypes;

  AppHeader = React.createClass({
    propTypes: {
      title: PropTypes.string.isRequired
    },

    render: function() {
      return (
        <div className="row app-header">
          <div className="large-12 small-12 medium-12 columns">
            <h3>{this.props.title}</h3>
          </div>
        </div>
      )
    }
  });

module.exports = AppHeader;
