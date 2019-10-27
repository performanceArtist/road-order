import { io } from '@root/server';
import { DatabaseTask } from '@shared/types';
import config from '@root/config';

import { getServerTask } from '../task';

export default async function(order: DatabaseTask) {
  if (order.condor_id !== config.condor.id) return;

  const task = await getServerTask(order);

  io.emit('message', {
    type: 'new_order',
    payload: task
  });
}
