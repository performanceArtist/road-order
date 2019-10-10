import knex from '@root/connection';

import { TaskFilters } from '@client/shared/types';

export async function getTasks({
  startDate,
  endDate,
  condor
}: Partial<TaskFilters> = {}) {
  const query = knex('orders')
    .select('*')
    .limit(10);

  startDate && query.where('date', '>=', startDate);
  endDate && query.where('date', '<', endDate);
  condor && query.where({ condor_id: condor });

  const orders = await query;
  return orders;
}

export async function getTask(id: string) {
  return knex('orders')
    .select('*')
    .where({ id });
}
