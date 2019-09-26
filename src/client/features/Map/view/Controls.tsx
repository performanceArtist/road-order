import * as React from 'react';

import Button from '@elements/Button/Button';

type Props = {
  hasArrived: boolean;
  measurementStarted: boolean;
  onMeasurementClick: Function;
  onCancelClick: Function;
};

const Controls: React.FC<Props> = ({
  hasArrived,
  measurementStarted,
  onMeasurementClick,
  onCancelClick
}) => (
  <div
    className={
      hasArrived ? 'map-controls map-controls_arrived' : 'map-controls'
    }
  >
    <div className="map-controls__buttons">
      <div className="map-controls__button">
        <Button
          disabled={!hasArrived || measurementStarted}
          onClick={onMeasurementClick}
        >
          Измерить
        </Button>
      </div>
      <div className="map-controls__button">
        <Button disabled={!measurementStarted} onClick={onCancelClick}>
          Отменить
        </Button>
      </div>
    </div>
  </div>
);

export default Controls;
