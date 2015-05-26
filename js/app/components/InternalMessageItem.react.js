var
  React = require( "react" ),
  classNames = require( "classnames" ),

  PropTypes = React.PropTypes,

  InternalMessageItem = React.createClass({
    propTypes: {
      messageObject: PropTypes.object.isRequired
    },

    getMessageClass( type ) {
      switch( type ) {
        case "success":
          return "success";
        case "warning":
          return "warning";
        case "error":
          return "error";
        default:
          return "info"
      }
    },

    render: function() {
      var
        messageObject = this.props.messageObject,
        classes = {
          "alert-box": true,
          "radius": true
        };

      classes[ this.getMessageClass( messageObject.type ) ] = true;
      return (
        <div className={classNames(classes)}>{messageObject.message}</div>
      )
    }
  });

module.exports = InternalMessageItem;
