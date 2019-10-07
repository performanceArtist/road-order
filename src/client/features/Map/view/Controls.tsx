import * as React from 'react';

import { Button } from '@shared/view';

type Props = {
  hasArrived: boolean;
  measurementStarted: boolean;
  onMeasurementClick(event: any): void;
  onCancelClick(event: any): void;
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
    </div>
  </div>
);

export default Controls;
