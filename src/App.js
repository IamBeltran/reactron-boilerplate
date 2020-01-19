// ▶ Import react dependecies
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

// ▶ Import components
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
