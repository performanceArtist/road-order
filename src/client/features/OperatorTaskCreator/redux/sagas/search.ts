import { request } from '@root/client/shared/utils';

import { creators } from '../index';

export default request({
  url: 'api/location',
  apiAction: creators.getLocation,
  method: 'get'
});
