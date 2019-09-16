import * as React from 'react';

import Button from '@components/Button/Button';

type Props = {
  hasArrived: boolean;
  measurementStarted: boolean;
};

const Controls: React.FC<Props> = ({ hasArrived, measurementStarted }) => (
  <div
    className={
      hasArrived ? 'map-controls map-controls_arrived' : 'map-controls'
    }
  >
    <div className="map-controls__buttons">
      <div className="map-controls__button">
        <Button disabled={!hasArrived} onClick={() => alert('kke')}>
          Измерить
        </Button>
      </div>
      <div className="map-controls__button">
        <Button disabled={!measurementStarted} onClick={() => alert('kke')}>
          Отменить
        </Button>
      </div>
    </div>
  </div>
);

export default Controls;
