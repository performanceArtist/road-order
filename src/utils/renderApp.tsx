import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';

import scripts from '@client/entries/dependencies';
import { renderHTML } from './renderHTML';

export const renderApp = (url: string, props: any = {}, userType = 'user') => {
  const store = require(`@root/client/entries/${userType}/store`).default(
    false
  );
  const reduxState = store.getState();
  const App = require(`@root/client/entries/${userType}/App`).default;

  const withRouter = (
    <StaticRouter location={`${url}`}>
      <App props={props} />
    </StaticRouter>
  );

  const jsx = reduxState ? (
    <ReduxProvider store={store}>{withRouter}</ReduxProvider>
  ) : (
    withRouter
  );

  const reactDom = renderToString(jsx);
  const helmetData = Helmet.renderStatic();

  return renderHTML({
    reactDom,
    reduxState,
    helmetData,
    bundle: userType,
    scripts: scripts[userType]
  });
};
