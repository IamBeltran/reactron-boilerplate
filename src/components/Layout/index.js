// ▶ Import react dependecies
import React from 'react';

// ▶ Import components
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const Layout = () => {
  return (
    <div id="container-wrapper">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;
