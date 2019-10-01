export interface Task {
  id: number;
  order: string;
  status: 'ready' | 'taken' | 'done';
  start: number;
  finish: number;
  forward: boolean;
  backward: boolean;
  isForward: boolean;
  lanesCount: number;
  description: string | null;
  lane?: number;
  kondor: string | null;
  roadPartName: string;
  street: string;
  streetId: string;
  settlement: string;
  settlementId: string;
  city: string;
  cityId: string;
  regionId: string;
  region: string;
  from: [number, number];
  to: [number, number];
  current: [number, number];
}

export interface AllTaskFilters {
  startDate: Date;
  endDate: Date;
  kondor: number;
}

export type TaskFilters = Partial<AllTaskFilters>;
