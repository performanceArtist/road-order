import * as React from 'react';

import { canUseDOM } from '../../utils';

let Map = () => <></>;

if (canUseDOM) {
  Map = require('@client/features/Map/Map').default;
}

const MapView = () => {
  return (
    <div>
      <Map />
    </div>
  );
};

export default MapView;
