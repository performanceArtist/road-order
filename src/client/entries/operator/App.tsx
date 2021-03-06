import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '@client/layout/Header/Header';
import { ModalManager } from '@features/Modal';
import { Navigation } from '@client/layout/Navigation/Navigation';
import Footer from '@client/layout/Footer/Footer';
import { hot } from 'react-hot-loader/root';
import Profile from '@components/Profile/Profile';
import Bootstrapper from '@root/client/shared/view/Bootstrapper/Bootstrapper';

import routes from './routes';

const App = () => {
  return (
    <div className="container">
      <main className="app">
        <ModalManager />
        <Bootstrapper />
        <div className="app__navigation">
          <Navigation
            links={routes.map(({ path, title }) => ({
              url: path,
              title
            }))}
          />
          <Profile />
        </div>
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

export default hot(App);
