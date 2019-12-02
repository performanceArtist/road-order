import { request } from '@root/client/shared/utils';

import { creators } from '../index';

export default request({
  url: 'api/route',
  apiAction: creators.getRoute,
  method: 'get'
});
