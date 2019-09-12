import * as React from 'react';

const qs = require('query-string');

import { canUseDOM } from '../../utils';

let Map = () => <></>;

if (canUseDOM) {
  Map = require('@client/features/Map/Map').default;
}

const MapView = ({ location: { search } }) => {
  const query = qs.parse(search);

  return (
    <div>
      <Map from={query.from} to={query.to} />
    </div>
  );
};

export default MapView;
