import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MainScreen from './containers/MainScreen/MainScreen';

const App = () => {
  const routes = [
    {
      path: '/',
      component: MainScreen,
      exact: false,
    },
  ];

  const routesComp = routes.map((el) => {
    return (
      <Route
        key={el.path}
        path={el.path}
        component={el.component}
        exact={el.exact} />
    );
  });

  return (
    <Switch>
      {routesComp}
    </Switch>
  );
}

export default App;
