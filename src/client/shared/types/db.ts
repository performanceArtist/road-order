import { UserGroup } from './user';
import { GPSCoordinates } from './gps';

export type DatabaseTask = {
  id?: number;
  order_number: string;
  date: Date;
  route: number[];
  distance: [number, number];
  is_direction_forward: boolean;
  description: string;
  lane_number: number;
  status_id: number;
  road_category_id: number;
  condor_id: number;
  user_id: number;
  company_id: number;
};

export type DatabaseUser = {
  id: number;
  login: string;
  password: string;
  name: string;
  group_id: number;
};

export type DatabaseUserGroup = {
  id: number;
  name: UserGroup;
};

export type DatabaseCondorInfoType = 'coordinates' | 'speed';
export type DatabaseCondorInfo = {
  id: number;
  node_id: DatabaseCondorInfoType;
  value: string;
  time: Date | null;
  condor_id: number;
};

export type DatabaseMeasurement = {
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

export type DatabaseJob = {
  id: number;
  description: string;
  order_id: number;
};

export type DatabaseRouteMarkType =
  | 'cancel_with-audio'
  | 'cancel_roadworks'
  | 'cancel_car-crash-ahead'
  | 'cancel_condor-malfunction'
  | 'mark';

export type DatabaseRouteMark = {
  id: number;
  coordinates: GPSCoordinates;
  mark_type_id: number;
  order_id: number;
  audio_path?: string;
  comment?: string;
};
