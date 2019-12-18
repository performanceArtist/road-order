import { request } from '@root/client/shared/utils';

import { mapActions } from '../index';
const { getRoute, getRoutePath } = mapActions;

export default request({
  url: 'api/route',
  apiAction: [getRoute, getRoutePath],
  method: 'get'
});
