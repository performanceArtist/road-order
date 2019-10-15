import knex from '@root/connection';

import {
  TaskFilters,
  TaskFormData,
  DatabaseTask,
  ServerTask
} from '@client/shared/types';

export async function getServerTasks({
  startDate,
  endDate,
  condor,
  user
}: TaskFilters): Promise<ServerTask[]> {
  const query = knex('orders')
    .select('*')
    .limit(10);

  startDate && query.where('date', '>=', startDate);
  endDate && query.where('date', '<', endDate);
  condor && query.where({ condor_id: condor });
  user && query.where({ user_id: user });

  const dbTasks: DatabaseTask[] = await query;
  const serverTasks = Promise.all(dbTasks.map(getServerTask));

  return serverTasks;
}

const getServerTask = async (dbTask: DatabaseTask) => {
  const {
    id,
    order_number,
    date,
    coordinates,
    distance,
    is_direction_forward,
    description,
    lane_number,
    condor_id,
    status_id,
    company_id,
    road_category_id,
    user_id
  } = dbTask;

  const condor = await knex('condor_diagnostics')
    .select('*')
    .where({ condor_id, node_id: 'coordinates' })
    .first();
  const current = JSON.parse(condor.value) as [number, number];
  const status = await knex('order_status')
    .select('*')
    .where({
      id: status_id
    })
    .first();
  const company = await knex('order_companies')
    .where({
      id: company_id
    })
    .first().name;
  const user = await knex('users')
    .where({
      id: user_id
    })
    .first();

  const road_category = await knex('order_road_category')
    .where({
      id: road_category_id
    })
    .first();

  const road_class = await knex('road_category_class')
    .where({
      id: road_category.road_class_id
    })
    .first().name;

  const serverTask: ServerTask = {
    id: id as number,
    date,
    order_number,
    coordinates: {
      from: [coordinates[0], coordinates[1]],
      to: [coordinates[2], coordinates[3]],
      current
    },
    distance,
    is_direction_forward,
    description,
    lane_number,
    status: status.name,
    company,
    condor: {
      id: condor_id
    },
    user: {
      id: user_id,
      login: user.login as string,
      group: 'driver',
      name: user.name as string
    },
    road_category: road_category.name,
    road_class
  };

  return serverTask;
};

export async function createTask(formData: TaskFormData) {
  const {
    from,
    to,
    company,
    condor,
    category,
    direction,
    user
  } = formData;
  const newTask: DatabaseTask = {
    date: new Date(),
    order_number: '12345',
    coordinates: JSON.parse(from).concat(JSON.parse(to)),
    distance: [0, 100],
    is_direction_forward: direction === 'forward',
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
