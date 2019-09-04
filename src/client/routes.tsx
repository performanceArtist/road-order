import Index from './views/Index/Index';
import Login from './views/Login/Login';

import { Icon } from './layout/Navigation/Navigation';

export type Route = {
  path: string;
  title: string;
  icon: Icon;
  component: React.Component;
  exact: boolean;
};

export default [
  {
    path: '/',
    title: 'Homepage',
    icon: Icon.HOME,
    component: Index,
    exact: true
  },
  {
    path: '/login',
    title: 'Login',
    component: Login
  }
];
