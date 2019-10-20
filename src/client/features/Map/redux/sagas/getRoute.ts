import { request } from '@shared/utils';

import { MAP } from '../actions';

export default request({
  url: 'api/route',
  apiAction: [MAP.GET_ROUTE, MAP.GET_ROUTE_PATH],
  method: 'get'
});
