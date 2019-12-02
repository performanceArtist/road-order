import { request } from '@root/client/shared/utils';

import { creators } from '../index';

export default request({
  url: '/api/tasks',
  apiAction: creators.getTasks,
  method: 'get'
});
