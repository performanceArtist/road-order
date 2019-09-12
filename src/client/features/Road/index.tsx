import * as React from 'react';

import RoadChart from './RoadChart';
import RoadControl from './RoadControl';

const Road = () => {
  return (
    <div>
      <RoadChart min={0} max={1200} current={853} />
      <RoadControl />
    </div>
  );
};

export default Road;
