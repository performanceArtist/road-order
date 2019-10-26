import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '@client/layout/Header/Header';
import Footer from '@client/layout/Footer/Footer';
import Index from '@client/views/public/Index/Index';
import Login from '@client/views/public/Login/Login';

const routes = [
  { path: '/', exact: true, component: Index },
  { path: '/login', component: Login }
];

const App = () => {
  return (
    <div className="container">
      <main className="app">
        <div className="app__content">
          <Header />
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
