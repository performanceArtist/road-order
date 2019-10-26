import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navigation } from '@client/layout/Navigation/Navigation';
import Footer from '@client/layout/Footer/Footer';
import Profile from '@components/Profile/Profile';

import routes from './routes';

const App = () => {
  return (
    <div className="container">
      <main className="app">
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
