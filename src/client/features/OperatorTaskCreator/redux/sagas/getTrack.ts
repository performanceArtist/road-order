import { request } from '@shared/utils/newSaga';

import { creators } from '../index';

export default request({
  url: 'api/route',
  apiAction: creators.getRoute,
  method: 'get'
});
