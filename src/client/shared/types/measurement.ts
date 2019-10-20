export type ServerMeasurement = {
  id: number;
  distance: number;
  track: number[];
  time?: Date;
  density: number;
  thickness: number;
  iri: [number, number];
  coleinost: [number, number];
  order_job_id: number;
};
