import * as React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';

import { actions as modalActions } from '@features/Modal/redux';
const { openModal, closeModal } = modalActions;
import { RootState } from '@root/client/redux/driver/reducer';
import { GPSCoordinates } from '@shared/types';

import RoadChart from './RoadChart';
import RoadControl from './RoadControl';
import SpeedBar from './SpeedBar';
import { markRequest } from '../redux/actions';

interface IStateProps {
  taskId: string;
  carPosition: GPSCoordinates;
}

type IProps = IStateProps & typeof mapDispatch;

const Road: React.FC<IProps> = ({
  openModal,
  taskId,
  carPosition,
  markRequest
}) => {
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);

  let counter = 0;
  let interval: NodeJS.Timer;

  const startSimulation = () => {
    interval = setInterval(() => {
      setSpeed(35 + Math.random() * 5);
      setDistance(counter * 100 + Math.random());
      if (distance > 1200) clearInterval(interval);
      counter += 1;
    }, 300);
  };

  return (
    <div>
      <SpeedBar current={speed} limit={40} />
      <RoadChart min={0} max={1200} current={distance} />
      <RoadControl
        onStart={startSimulation}
        onEnd={() => {}}
        onCancel={() => openModal('Cancel')}
        onMarkAdd={() =>
          openModal('Recorder', {
            onSaveClick: (audio: any) => {
              markRequest({
                audio,
                taskId,
                latitude: carPosition ? carPosition[0] : 0,
                longitude: carPosition ? carPosition[1] : 0
              });
            }
          })
        }
        onStop={() => {}}
      />
    </div>
  );
};

const mapState = (state: RootState): IStateProps => ({
  taskId: state.tasks.currentTaskId,
  carPosition: state.map.carPosition
});

const mapDispatch = {
  openModal,
  closeModal,
  markRequest
};

export default connect(
  mapState,
  mapDispatch
)(Road);
