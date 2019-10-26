import { BrowserRouter, HashRouter } from 'react-router-dom';

const env: 'production' | 'development' =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';
const Router = env === 'production' ? BrowserRouter : HashRouter;

export default Router as React.ComponentType;
