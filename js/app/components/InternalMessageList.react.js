var
  React = require( "react" ),

  InternalMessageItem = require( "./InternalMessageItem.react" ),
  InternalMessageStore = require( "../stores/InternalMessageStore" ),

  InternalMessageList = React.createClass({

    getState: function() {
      return {
        messageList: InternalMessageStore.getMessageList()
      };
    },

    getInitialState: function() {
      return this.getState();
    },

    componentDidMount: function() {
      InternalMessageStore.addInternalMessageAddedListener(
        this.handleInternalMessageAdded
      );
    },

    componentWillUnmount: function() {
      InternalMessageStore.removeInternalMessageAddedListener(
        this.handleInternalMessageAdded
      )
    },

    handleInternalMessageAdded: function() {
      this.setState(this.getState());
    },

    render: function() {
      var
        messageList = this.state.messageList,
        renderedMessageList = messageList.map(function( messageObject ) {
          return <InternalMessageItem messageObject={messageObject} />
        });

      return (
        <div className="row internal-messages">
          <div className="small-12 medium-12 large-12 columns">
          {renderedMessageList}
          </div>
        </div>
      );
    }
  });

module.exports = InternalMessageList;
