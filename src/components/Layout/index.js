// ▶ Import react dependecies
import React from 'react';

// ▶ Import components
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

// ▶ Import Containers
// import { AuthProvider } from './context/AuthContext';
// <AuthProvider></AuthProvider>

// ▶ Import css file
import './Layout.css';

const App = () => {
  return (
    <div id="container-wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
