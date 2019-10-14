import * as React from 'react';
const qs = require('query-string');

import { Map } from '@features/Map';

type Props = {
  location: {
    search: string;
  }
}

const MapView: React.FC<Props> = ({ location: { search } }) => {
  const query = qs.parse(search);
  const { from, to, current } = query;

  return (
    <div>
      <Map from={from} to={to} current={current} />
    </div>
  );
};

export default MapView;
