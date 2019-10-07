import Index from '@client/views/public/Index/Index';
import TaskView from '@client/views/operator/TaskPanelView/TaskPanelView';
import TaskCreationView from '@client/views/operator/TaskCreationView/TaskCreationView';
import MapView from '@client/views/driver/MapView/MapView';

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
    path: '/map',
    title: 'Карта',
    component: MapView
  },
  {
    path: '/create',
    title: 'Новое задание',
    component: TaskCreationView,
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
