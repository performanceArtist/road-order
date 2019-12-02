import { request } from '@shared/utils/newSaga';

import { creators } from '../index';

export default request({
  url: '/api/task/create',
  apiAction: creators.createTask,
  method: 'post'
});
