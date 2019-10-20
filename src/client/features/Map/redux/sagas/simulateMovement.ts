import { request } from '@shared/utils';

import { MAP } from '../actions';

export default request({
  url: '/api/simulate/movement',
  apiAction: MAP.SIMULATE_MOVEMENT,
  method: 'post'
});
