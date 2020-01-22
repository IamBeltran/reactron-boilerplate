// ▶ Import react dependecies
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

// ▶ Import components
import Layout from './components/Layout';
// import { AuthProvider } from './context/AuthContext';
// <AuthProvider></AuthProvider>

// ▶ Import css file

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
