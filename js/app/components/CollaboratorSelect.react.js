var
  React = require( "react" ),

  UserStore = require( "../stores/UserStore" ),
  RepositoryStore = require( "../stores/RepositoryStore" ),
  CollaboratorStore = require( "../stores/CollaboratorStore" ),

  CollaboratorActions = require( "../actions/CollaboratorActions" ),

  CollaboratorSelect = React.createClass({

    getState: function() {
      return {
        token: UserStore.getToken(),
        repository: RepositoryStore.getSelectedRepository(),
        collaboratorList: CollaboratorStore.getCollaboratorList()
      }
    },

    getInitialState: function() {
      return this.getState();
    },

    /**
     * Add handler for collaborator list changed event. Send action
     * to load collaborator list
     */
    componentDidMount: function() {
      CollaboratorStore.addCollaboratorListChangedListener(
        this.handleCollaboratorListChanged
      );

      CollaboratorActions.getCollaboratorList(
        this.state.token,
        this.state.repository.full_name
      );
    },

    /**
     * Remove handler for collaborator list changed event. Send action to
     * clear collaborator list
     */
    componentWillUnmount: function() {
      CollaboratorStore.removeCollaboartorListChangedListener(
        this.handleCollaboratorListChanged
      );

      CollaboratorActions.clearCollaboratorList();
    },

    render: function() {
      var
        collaboratorList = this.state.collaboratorList,
        collaboratorListRendered = collaboratorList.map(function( item ) {
          return (
            <option value={item.login}>{item.login}</option>
          );
        });
      return (
        <select {...this.props} >
          <option value="">No Assignee</option>
          {collaboratorListRendered}
        </select>
      )
    },

    handleCollaboratorListChanged: function() {
      this.setState( this.getState() );
    }
  });

module.exports = CollaboratorSelect;
