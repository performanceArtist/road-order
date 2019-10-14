import AdminView from '@root/client/views/admin/CreateUserView/CreateUserView';
import { Icon } from '@client/layout/Navigation/Navigation';

export type Route = {
  path: string;
  title: string;
  icon: Icon;
  component: React.Component;
  exact: boolean;
};

export default [
  { path: '/', title: 'Create user', exact: false, component: AdminView }
];
