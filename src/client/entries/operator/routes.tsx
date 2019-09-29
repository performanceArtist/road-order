import Index from '@client/views/Index/Index';
import { Icon } from '@client/layout/Navigation/Navigation';

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
    component: Index,
    exact: true
  }
];
