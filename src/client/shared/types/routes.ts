import { Icon } from '@client/layout/Navigation/Navigation';

export type Route = {
  path: string;
  title: string;
  icon: Icon;
  component: React.Component;
  exact: boolean;
};
