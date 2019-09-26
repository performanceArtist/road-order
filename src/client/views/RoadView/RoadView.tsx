import * as React from 'react';

import { Road } from '@features/Road';

const RoadView = () => {
  return (
    <div className="road-view">
      <div className="road-view__road">
        <Road />
      </div>
    </div>
  );
};

export default RoadView;
