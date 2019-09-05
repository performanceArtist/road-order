import Index from '@client/views/Index/Index';
import Login from '@client/views/Login/Login';
import TaskView from '@client/views/TaskView/TaskView';
import MapView from '@client/views/MapView/MapView';
import RoadView from '@client/views/RoadView/RoadView';

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
  },
  {
    path: '/login',
    title: 'Login',
    component: Login
  },
  {
    path: '/task',
    title: 'Task',
    component: TaskView
  },
  {
    path: '/map',
    title: 'Map',
    component: MapView
  },
  {
    path: '/road',
    title: 'Road',
    component: RoadView
  }
];
