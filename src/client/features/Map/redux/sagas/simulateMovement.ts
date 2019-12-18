import { request } from '@root/client/shared/utils';

import { mapActions } from '../index';

export default request({
  url: '/api/simulate/movement',
  apiAction: mapActions.simulateMovement,
  method: 'post'
});
