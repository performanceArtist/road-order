import * as React from 'react';

import RoadChart from './RoadChart';
import RoadControl from './RoadControl';

const Road = () => {
  return (
    <div>
      <RoadChart min={0} max={2000} current={1200} />
      <RoadControl />
    </div>
  );
};

export default Road;
