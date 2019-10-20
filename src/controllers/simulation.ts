import knex from '@root/connection';
import config from '@root/config';
import {
  GPSTrack,
  DatabaseMeasurement,
  DatabaseJob
} from '@root/client/shared/types';

export function simulateMovement(
  route: GPSTrack,
  callback?: (index: number) => Promise<any>
) {
  let interval: NodeJS.Timeout | undefined = undefined;
  let index = 0;

  interval = setInterval(async () => {
    try {
      const coordinates = route[index];
      if (!coordinates) {
        return interval && clearInterval(interval);
      }
      await knex('condor_diagnostics')
        .update({ value: JSON.stringify(coordinates) })
        .where({
          node_id: 'coordinates',
          condor_id: config.condor.id
        });
      callback && (await callback(index));
      index += 1;
    } catch (error) {
      console.log(error);
      return interval && clearInterval(interval);
    }
  }, 300);
}

export async function simulateMeasurement(route: GPSTrack, orderId: number) {
  const job: Omit<DatabaseJob, 'id'> = {
    description: '',
    order_id: orderId
  };
  const jobId = await knex('order_jobs')
    .insert(job)
    .returning('id');

  simulateMovement(route, async (index: number) => {
    const measurement: Omit<DatabaseMeasurement, 'id'> = {
      distance: index * 100,
      track: [],
      density: Math.random() * 3,
      thickness: Math.random(),
      iri: [Math.random(), Math.random()],
      coleinost: [Math.random(), Math.random()],
      order_job_id: parseInt(jobId, 10)
    };
    await knex('job_measurements').insert(measurement);
  });
}
