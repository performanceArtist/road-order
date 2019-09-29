import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '@client/layout/Header/Header';
import { ModalManager } from '@features/Modal';
import { Navigation } from '@client/layout/Navigation/Navigation';
import Footer from '@client/layout/Footer/Footer';
import { hot } from 'react-hot-loader/root';
import Profile from '@components/Profile/Profile';

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
          <Profile />
        </div>
        <div className="app__content">
          <Header />
          <Switch>
            {routes.map(({ path, exact, component: Component }, index) => (
              <Route
                key={index}
                exact={exact}
                path={path}
                render={props => <Component {...props} />}
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
