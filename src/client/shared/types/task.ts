import { UserGroup, UserInfo } from './user';

export type TaskStatus = 'ready' | 'taken' | 'done' | 'cancelled';
export type RoadClass = 'Автомагистраль' | 'Скоростная' | 'Обычная';
export type RoadCategory = 'IA' | 'IБ' | 'IB' | 'I' | 'II' | 'III' | 'IV' | 'V';
export type CondorInfo = {
  id: number;
  coordinates: [number, number];
}

export type ServerTask  = {
  id: number;
  order_number: number;
  date: Date;
  coordinates: {
    from: [number, number];
    to: [number, number];
  },
  distance: [number, number];
  is_direction_forward: boolean;
  description: string;
  lane_number: number;
  status: TaskStatus;
  road_class: RoadClass;
  road_category: RoadCategory;
  condor: CondorInfo;
  user: UserInfo;
}

export type DatabaseTask = {
  order_number: number;
  date?: Date;
  coordinates: number[],
  distance: [number, number];
  is_direction_forward: boolean;
  description: string;
  lane_number: number;
  status_id: number;
  road_category_id: number;
  condor_id: number;
  user_id: number;
  company_id: number;
}

export type TaskFormData = {
  from: string;
  to: string;
  user: string;
  category: string;
  condor: string;
  company: string;
  forward: boolean;
  backward: boolean;
}