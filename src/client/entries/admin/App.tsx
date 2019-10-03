import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Footer from '@client/layout/Footer/Footer';
import AdminView from '@root/client/views/admin/CreateUserView/CreateUserView';

const routes = [{ path: '/admin', exact: false, component: AdminView }];

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