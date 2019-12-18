import { request } from '@root/client/shared/utils';

import { taskCreatorActions } from '../index';

export default request({
  url: 'api/route',
  apiAction: taskCreatorActions.getRoute,
  method: 'get'
});
