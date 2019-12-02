import { request } from '@root/client/shared/utils';

import { creators } from '../index';

export default request({
  url: '/api/simulate/movement',
  apiAction: creators.simulateMovement,
  method: 'post'
});
