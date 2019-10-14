import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as L from 'leaflet';

import { TaskMap } from '@features/Map';

import TaskForm from './TaskForm';
import LocationSearch from './LocationSearch';
import {
  getLocation,
  createTask,
  getRoute,
  setFrom,
  setTo
} from '../redux/actions';
import { RootState } from '@root/client/redux/operator/reducer';
import { TaskFormData } from '@root/client/shared/types';

const mapDispatch = { getLocation, createTask, getRoute, setFrom, setTo };

const mapState = ({ newTask }: RootState) => ({
  newTask
});

interface IStateProps {
  newTask: {
    location: [number, number];
    from?: [number, number];
    to?: [number, number];
    track: [number, number][];
  };
}

type IProps = typeof mapDispatch & IStateProps;

const OperatorTaskCreator: React.FC<IProps> = ({
  getLocation,
  getRoute,
  createTask,
  setFrom,
  setTo,
  newTask
}) => {
  type ActiveField = 'from' | 'to';
  const [active, setActive] = useState<ActiveField>('from');
  const { from, to, location, track } = newTask;

  const onMapClick = ({ lat, lng }: L.LatLng) => {
    if (active === 'from') {
      setFrom([lat, lng]);
      setActive('to');
    } else {
      setTo([lat, lng]);
    }
  };

  useEffect(() => {
    if (from && to) {
      getRoute(from, to);
    }
  }, [from, to]);

  const onSearchSubmit = (search: string) => {
    getLocation(search);
  };

  const handleFormSubmit = (formData: TaskFormData) => {
    createTask(formData);
  };

  const coordToString = (c: [number, number]) => {
    return `[${c[0].toFixed(12)}, ${c[1].toFixed(12)}]`;
  };

  return (
    <div className="operator-task-creator">
      <div className="operator-task-creator__row">
        <div className="operator-task-creator__map">
          <div className="operator-task-creator__location-search">
            <LocationSearch onSubmit={onSearchSubmit} />
          </div>
          <TaskMap onMapClick={onMapClick} center={location} track={track} />
        </div>
        <div className="operator-task-creator__form">
          <TaskForm
            onSubmit={handleFormSubmit}
            activeField={active}
            onActiveFieldClick={(what: ActiveField) => {
              setActive(what);
            }}
            fromValue={from ? coordToString(from) : ''}
            toValue={to ? coordToString(to) : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapState,
  mapDispatch
)(OperatorTaskCreator);
