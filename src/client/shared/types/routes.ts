import { Icon } from '@client/layout/Navigation/Navigation';

export type IRoute = {
  path: string;
  title: string;
  icon: Icon;
  component: React.Component;
  exact: boolean;
};

