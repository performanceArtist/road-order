import * as React from 'react';

import RoadChart from './RoadChart';
import RoadControl from './RoadControl';
import SpeedBar from './SpeedBar';

const Road = () => {
  return (
    <div>
      <SpeedBar current={35} limit={40} />
      <RoadChart min={0} max={1200} current={853} />
      <RoadControl />
    </div>
  );
};

export default Road;
