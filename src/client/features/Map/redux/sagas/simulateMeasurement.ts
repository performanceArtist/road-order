import { request } from '@root/client/shared/utils';

import { mapActions } from '../index';

export default request({
  url: '/api/simulate/measurement',
  apiAction: mapActions.simulateMeasurement,
  method: 'post'
});
