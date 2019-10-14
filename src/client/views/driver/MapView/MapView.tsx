import * as React from 'react';
const qs = require('query-string');

import { Map } from '@features/Map';

const MapView = ({ location: { search } }) => {
  const query = qs.parse(search);
  const { from, to, current } = query;

  return (
    <div>
      <Map from={from} to={to} current={current} />
    </div>
  );
};

export default MapView;
