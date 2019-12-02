import { request } from '@root/client/shared/utils';

import { creators } from '../index';

export default request({
  url: '/api/task/create',
  apiAction: creators.createTask,
  method: 'post'
});
