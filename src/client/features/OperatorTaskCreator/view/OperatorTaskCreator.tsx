import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as L from 'leaflet';

import { RootState } from '@root/client/redux/operator/reducer';
import { TaskFormData, GPSTrack, GPSCoordinates } from '@shared/types';
import TaskMap from './TaskMapEntry';

import TaskForm from './TaskForm';
import LocationSearch from './LocationSearch';
import { creators } from '../redux';
const { addRoutePoint, removeLastRoutePoint, createTask, getLocation, getRoute } = creators;
const mapDispatch = {
  addRoutePoint,
  removeLastRoutePoint,
  createTask: createTask.request,
  getLocation: getLocation.request,
  getRoute: getRoute.request
};

const mapState = ({ newTask }: RootState) => ({
  newTask
});

interface IStateProps {
  newTask: RootState['newTask'];
}

type IProps = typeof mapDispatch & IStateProps & IStateProps;

const OperatorTaskCreator: React.FC<IProps> = ({
  newTask,
  getLocation,
  getRoute,
  createTask,
  addRoutePoint,
  removeLastRoutePoint
}) => {
  type ActiveField = 'from' | 'to';
  const [active, setActive] = useState<ActiveField>('from');
  const { routePoints, location, track } = newTask;
  const from = routePoints[0];
  const to =
    routePoints.length > 1 ? routePoints[routePoints.length - 1] : undefined;

  const onMapClick = ({ lat, lng }: L.LatLng) => {
    addRoutePoint([lat, lng]);
    if (active === 'from') {
      setActive('to');
    }
  };

  useEffect(() => {
    if (from && to) {
      getRoute({ points: routePoints });
    }
  }, [routePoints]);

  const onSearchSubmit = (search: string) => {
    getLocation({ search });
  };

  const handleFormSubmit = (formData: TaskFormData) => {
    createTask({ ...formData, routePoints });
  };

  const handleUndo = () => {
    removeLastRoutePoint();
  };

  const coordToString = (c: GPSCoordinates) => {
    return `[${c[0].toFixed(12)}, ${c[1].toFixed(12)}]`;
  };

  return (
    <div className="operator-task-creator">
      <div className="operator-task-creator__row">
        <div className="operator-task-creator__map">
          <div className="operator-task-creator__location-search">
            <LocationSearch onSubmit={onSearchSubmit} />
          </div>
          <TaskMap onMapClick={onMapClick} location={location} track={track} />
        </div>
        <div className="operator-task-creator__form">
          <TaskForm
            onSubmit={handleFormSubmit}
            activeField={active}
            onActiveFieldClick={(what: ActiveField) => {
              setActive(what);
            }}
            onUndoButtonClick={handleUndo}
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
