import React from 'react';
import ReactDOM from 'react-dom';

import './scss/main.scss';

class App extends React.Component {
  render() {
    return (
      <div>Hi React!</div>
    );
  }
}

ReactDOM.render( <App/>, document.getElementById('react-body') );
