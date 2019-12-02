import { request } from '@shared/utils/newSaga';

import { creators } from '../index';

export default request({
  url: '/api/simulate/measurement',
  apiAction: creators.simulateMeasurement,
  method: 'post'
});
