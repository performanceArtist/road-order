import { request } from '@root/client/shared/utils';

import { taskCreatorActions } from '../index';

export default request({
  url: 'api/location',
  apiAction: taskCreatorActions.getLocation,
  method: 'get'
});
