// ▶ Import react dependecies
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

// ▶ Import Apollo modules
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createIpcLink } from 'graphql-transport-electron';
import { ApolloProvider } from '@apollo/react-hooks';

// ▶ Import components
import Layout from './components/Layout';
// import { AuthProvider } from './context/AuthContext'; <AuthProvider></AuthProvider>

// ▶ Import styles css
import './App.css';

// ▶ Import electron
const { electron } = window;
const { ipcRenderer } = electron;

/**
 *  NOTE: ApolloIpcLinkOptions
 *  channel: string
 *  ipc: IpcRenderer
 */
const IpcLink = createIpcLink({ ipc: ipcRenderer });

// » Create Apollo Client
const client = new ApolloClient({
  link: IpcLink,
  cache: new InMemoryCache(),
  name: 'react-web-client',
  version: '1.3',
  connectToDevTools: true,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout />
      </Router>
    </ApolloProvider>
  );
};

export default App;
