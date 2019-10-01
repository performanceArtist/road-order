import Index from '@client/views/public/Index/Index';
import TaskView from '@client/views/driver/TaskView/TaskView';
import MapView from '@client/views/driver/MapView/MapView';
import RoadView from '@client/views/driver/RoadView/RoadView';

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
