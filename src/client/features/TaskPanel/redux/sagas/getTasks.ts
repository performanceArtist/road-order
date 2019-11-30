import { request } from '@shared/utils/newSaga';

import { creators } from '../index';

export default request({
  url: '/api/tasks',
  apiAction: creators.getTasks,
  method: 'get'
});
