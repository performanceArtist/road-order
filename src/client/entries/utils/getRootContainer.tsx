import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

function getRootContainer(App: React.FC, store: any = null): any {
  const withRouter = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  if (!store) return withRouter;
  return <Provider store={store}>{withRouter}</Provider>;
}

export default getRootContainer;
