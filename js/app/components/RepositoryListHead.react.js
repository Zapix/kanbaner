var
  React = require( "react" ),

  RepositoryListHead = React.createClass({
    render: function() {
      return (
        <div className="row">
          <div className="large-5 medium-4 small-12 columns">
            <strong>Repository:</strong>
          </div>
          <div
            className="large-3 medium-3 hide-for-small-only columns text-center">
            <strong>Owner:</strong>
          </div>
          <div
            className="large-2 medium-2 hide-for-small-only columns text-center">
            <strong>Open issues:</strong>
          </div>
          <div
            className="large-2 medium-3 hide-for-small-only columns text-center">
            <strong>Updated:</strong>
          </div>
        </div>
      )
    }
  });

module.exports = RepositoryListHead;
