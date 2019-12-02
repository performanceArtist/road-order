import { request } from '@shared/utils/newSaga';

import { creators } from '../index';

export default request({
  url: 'api/location',
  apiAction: creators.getLocation,
  method: 'get'
});
