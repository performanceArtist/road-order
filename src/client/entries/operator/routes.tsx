import Index from '@client/views/public/Index/Index';
import TaskView from '@client/views/operator/TaskPanelView/TaskPanelView';
import TaskCreationView from '@client/views/operator/TaskCreationView/TaskCreationView';
import MapView from '@client/views/driver/MapView/MapView';
import MeasurementView from '@client/views/operator/MeasurementView/MeasurementView';

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
    component: TaskView
  },
  {
    path: '/map',
    title: 'Карта',
    component: MapView
  },
  {
    path: '/create',
    title: 'Новое задание',
    component: TaskCreationView
  },
  {
    path: '/history',
    title: 'Измерения',
    component: MeasurementView
  },
  {
    path: '/calibration',
    title: 'Калибровка',
    component: Index
  }
];
