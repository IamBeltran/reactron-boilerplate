// ▶ Import react dependecies
import React from 'react';

// ▶ Import components

// ▶ Import css file
import logo from './logo.svg';

const Main = () => {
  return (
    <main id="main-wrapper">
      <img src={logo} className="app-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a className="app-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </main>
  );
};

export default Main;
