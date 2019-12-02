import * as R from 'ramda';

import { GPSTrack } from '@shared/types';
import knex from '@root/connection';

import {
  TaskFilters,
  TaskFormData,
  DatabaseTask,
  ServerTask,
  GPSCoordinates,
  DatabaseRouteMark,
  DatabaseRouteMarkType
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

export const getServerTask = async (dbTask: DatabaseTask) => {
  const {
    id,
    order_number,
    date,
    route,
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
  const current = JSON.parse(condor.value) as GPSCoordinates;
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

  const pairs = (arr: number[]) =>
    arr.reduce((acc, cur, i) => {
      if (i % 2 === 0) {
        return R.append([cur], acc);
      } else {
        return R.adjust(acc.length - 1, el => el.concat(cur), acc);
      }
    }, [] as GPSTrack);

  const serverTask: ServerTask = {
    id: id as number,
    date,
    order_number,
    route: pairs(route) as GPSTrack,
    current_position: current,
    distance,
    is_direction_forward,
    description,
    lane_number,
    status: status.name,
    company,
    condor: condor_id,
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
  const { company, condor, category, direction, user, routePoints } = formData;
  const newTask: DatabaseTask = {
    date: new Date(),
    order_number: '12345',
    route: R.flatten(routePoints),
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

export async function roadMark(args: {
  taskId: number;
  reason: DatabaseRouteMarkType | Blob;
  coordinates: GPSCoordinates;
  audioPath?: string;
}) {
  const { taskId, reason, coordinates, audioPath } = args;
  const markName = typeof reason === 'string' ? reason : 'cancel_with-audio';
  const markTypeId = await knex('route_mark_type')
    .select('*')
    .where({ name: markName })
    .first();

  const newMark: Omit<DatabaseRouteMark, 'id'> = {
    coordinates:
      typeof coordinates === 'string' ? JSON.parse(coordinates) : coordinates,
    mark_type_id: markTypeId.id,
    order_id: taskId,
    audio_path: audioPath
  };

  await knex('order_route-marks').insert(newMark);

  if (reason !== 'mark') {
    await knex('orders')
      .update({ status_id: 5 })
      .where({ id: taskId });
  }
}
