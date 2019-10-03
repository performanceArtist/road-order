import React from 'react';
import { connect } from 'react-redux';
import * as L from 'leaflet';

import { TaskMap } from '@features/Map';

import TaskForm from './TaskForm';
import LocationSearch from './LocationSearch';
import { getLocation } from '../redux/actions';
import { RootState } from '@root/client/redux/operator/reducer';

const mapDispatch = { getLocation };

const mapState = ({ newTask }: RootState) => ({
  newTask
});

interface IStateProps {
  newTask: {
    location: [number, number];
  };
}

type IProps = typeof mapDispatch & IStateProps;

const OperatorTaskCreator: React.FC<IProps> = ({ getLocation, newTask }) => {
  const onMapClick = ({ lat, lng }: L.LatLng) => {
    console.log(lat, lng);
  };

  const onSearchSubmit = (search: string) => {
    getLocation(search);
  };

  return (
    <div className="operator-task-creator">
      <LocationSearch onSubmit={onSearchSubmit} />
      <div className="operator-task-creator__row">
        <TaskMap onMapClick={onMapClick} center={newTask.location} />
        <TaskForm />
      </div>
    </div>
  );
};

export default connect(
  mapState,
  mapDispatch
)(OperatorTaskCreator);
