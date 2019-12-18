import { request } from '@root/client/shared/utils';

import { taskActions } from '../index';

export default request({
  url: '/api/tasks',
  apiAction: taskActions.getTasks,
  method: 'get'
});
