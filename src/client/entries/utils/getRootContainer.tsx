import * as React from 'react';
import Router from './Router';
import { Provider } from 'react-redux';

function getRootContainer(App: React.FC, store: any = null): any {
  const withRouter = (
    <Router>
      <App />
    </Router>
  );

  if (!store) return withRouter;
  return <Provider store={store}>{withRouter}</Provider>;
}

export default getRootContainer;
