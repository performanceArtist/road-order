import { request } from '@root/client/shared/utils';

import { creators } from '../index';
const { getRoute, getRoutePath } = creators;

export default request({
  url: 'api/route',
  apiAction: [getRoute, getRoutePath],
  method: 'get'
});
