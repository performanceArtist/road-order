import Index from '@client/views/Index/Index';
import TaskView from '@client/views/TaskView/TaskView';
import TaskCreationView from '@client/views/TaskCreationView/TaskCreationView';
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
    title: 'Оборудование',
    component: Index,
    exact: true
  },
  {
    path: '/tasks',
    title: 'База заданий',
    component: TaskView,
    exact: true
  },
  {
    path: '/create',
    title: 'Новое задание',
    component: Index,
    exact: true
  },
  {
    path: '/history',
    title: 'История измерений',
    component: Index,
    exact: true
  },
  {
    path: '/calibration',
    title: 'Калибровка',
    component: Index,
    exact: true
  }
];
