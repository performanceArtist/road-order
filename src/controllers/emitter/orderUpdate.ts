import { io } from '@root/server';
import { DatabaseTask } from '@shared/types';
import config from '@root/config';
import knex from '@root/connection';

export default async function(order: DatabaseTask) {
  if (order.condor_id !== config.condor.id) return;

  const status = await knex('order_status')
    .select('*')
    .where({ id: order.status_id })
    .first();

  io.emit('message', {
    type: 'update_order',
    payload: { id: order.id, status: status.name }
  });
}
