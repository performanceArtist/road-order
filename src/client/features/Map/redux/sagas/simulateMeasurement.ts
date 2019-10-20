import { request } from '@shared/utils';

import { MAP } from '../actions';

export default request({
  url: '/api/simulate/measurement',
  apiAction: MAP.SIMULATE_MEASUREMENT,
  method: 'post'
});
