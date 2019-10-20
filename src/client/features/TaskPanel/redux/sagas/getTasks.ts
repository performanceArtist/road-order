import { request } from '@shared/utils';

import { TASK } from '../actions';

export default request({
  url: '/api/tasks',
  apiAction: TASK.GET,
  method: 'get'
});
