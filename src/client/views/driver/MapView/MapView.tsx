import * as React from 'react';
const qs = require('query-string');
import { canUseDOM } from '@shared/utils';

let Map = () => <></>;
if (canUseDOM) {
  Map = require('@features/Map/view/Map').default;
}

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
