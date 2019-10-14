import { Icon } from '@client/layout/Navigation/Navigation';

export type ClientRoute = {
  path: string;
  title: string;
  icon: Icon;
  component: React.Component;
  exact: boolean;
};