import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './layout/Header/Header';
import ModalManager from './layout/ModalManager/ModalManager';
import { Navigation } from './layout/Navigation/Navigation';
import Footer from './layout/Footer/Footer';
import { hot } from 'react-hot-loader/root';

import routes from './routes';

const App = () => {
  return (
    <div className="container">
      <main className="app">
        <ModalManager />
        <div className="app__navigation">
          <Navigation
            links={routes.map(({ path, title, icon }) => ({
              url: path,
              title,
              icon
            }))}
          />
        </div>
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

export default hot(App);
