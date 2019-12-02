import { request } from '@root/client/shared/utils';

import { creators } from '../index';

export default request({
  url: '/api/simulate/measurement',
  apiAction: creators.simulateMeasurement,
  method: 'post'
});
