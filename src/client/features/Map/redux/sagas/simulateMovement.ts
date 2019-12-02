import { request } from '@shared/utils/newSaga';

import { creators } from '../index';

export default request({
  url: '/api/simulate/movement',
  apiAction: creators.simulateMovement,
  method: 'post'
});
