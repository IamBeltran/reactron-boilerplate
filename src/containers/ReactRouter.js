import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Store from '../components/Store';
import About from '../components/About';

const ReactRouter = () => {
  return (
    <React.Fragment key="reactrouter">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/about" component={About} />
      </Switch>
    </React.Fragment>
  );
};

export default ReactRouter;
