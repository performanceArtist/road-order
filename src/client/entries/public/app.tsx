import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Footer from '@client/layout/Footer/Footer';
import Index from '@client/views/Index/Index';
import Login from '@client/views/Login/Login';

const routes = [
  { path: '/', exact: true, component: Index },
  { path: '/login', component: Login }
];

const App = () => {
  return (
    <div className="container">
      <main className="app">
        <div className="app__content">
          <Switch>
            {routes.map(({ path, exact, component }, index) => (
              <Route
                key={index}
                exact={exact}
                path={path}
                component={component}
              />
            ))}
          </Switch>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
