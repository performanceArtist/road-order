import * as React from 'react';
import Road from '../../features/Road';
import SpeedBar from '@components/SpeedBar/SpeedBar';

const RoadView = () => {
  return (
    <div className="road-view">
      <div className="road-view__speed-bar">
        <SpeedBar limit={40} current={35} />
      </div>
      <div className="road-view__road">
        <Road />
      </div>
    </div>
  );
};

export default RoadView;
