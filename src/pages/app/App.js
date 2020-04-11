// Dependencies
import React from 'react';

// Components
import Threads from '@components/threads';

const App = () => {
  return (
    <div className="app-page">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            Reddit
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar_header"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar_header" className="navbar-menu"></div>
      </nav>

      <div className="columns">
        <div className="column is-two-fifths threads-column">
          <Threads.List />
        </div>

        <div className="column is-three-fifths content-column">
          <Threads.Details />
        </div>
      </div>
    </div>
  );
};

App.propTypes = {};

export default App;
