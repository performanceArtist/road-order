import { request } from '@root/client/shared/utils';

import { taskCreatorActions } from '../index';

export default request({
  url: '/api/task/create',
  apiAction: taskCreatorActions.createTask,
  method: 'post'
});
