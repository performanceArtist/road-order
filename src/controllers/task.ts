import knex from '@root/connection';

import { TaskFilters, TaskFormData, DatabaseTask } from '@client/shared/types';

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

export async function createTask(formData: TaskFormData) {
  const { from, to, company, condor, category, forward, backward, user } = formData;
  const newTask: DatabaseTask = {
    order_number: 12345,
    coordinates: JSON.parse(from).concat(JSON.parse(to)),
    distance: [0, 100],
    is_direction_forward: forward,
    description: 'Test',
    lane_number: 1,
    status_id: 1,
    road_category_id: parseInt(category, 10),
    condor_id: parseInt(condor, 10),
    user_id: parseInt(user, 10),
    company_id: parseInt(company, 10)
  };

  await knex('orders').insert(newTask);
}