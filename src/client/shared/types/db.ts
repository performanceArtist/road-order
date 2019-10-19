import { UserGroup } from './user';

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
}

export type DatabaseUserGroup = {
  id: number;
  name: UserGroup;
}