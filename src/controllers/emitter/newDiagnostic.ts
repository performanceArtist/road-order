import { io } from '@root/server';
import { DatabaseCondorInfo } from '@shared/types';
import config from '@root/config';

import { inferInfoValue } from '../condor';

export default function(info: DatabaseCondorInfo) {
  if (info.condor_id == config.condor.id) {
    io.emit('message', {
      type: 'new_diagnostic',
      payload: inferInfoValue(info)
    });
  }
}
