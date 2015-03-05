var
  React = require( "react" );
  LoaderStore = require( "../stores/LoaderStore" );

var
  getState = function() {
     return {
       loader: LoaderStore.getLoader()
     }
  };

var
  Loader = React.createClass({
    getInitialState: function() {
      return getState();
    },

    /**
     * Set loader change event listener
     */
    componentDidMount: function() {
      LoaderStore.addLoaderListener(this.onChange)
    },

    componentWillUnmount: function() {
      LoaderStore.removeLoaderListener(this.onChange)
    },

    render: function() {
      var loader = (
        <div></div>
      );

      if( this.state.loader ) {
       loader = (
         <div className="loader-container">
           <div className="loader-progress float shadow">
             <div className="progress__item"></div>
           </div>
         </div>
       );
      }

      return loader
    },

    /**
     * Handle loader change event
     */
    onChange: function() {
      this.setState( getState() );
    }
  });

module.exports = Loader;

