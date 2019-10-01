export type TaskStatus = 'ready' | 'taken' | 'done' | 'cancelled';
export interface Task {
  id: number;
  order: string;
  status: TaskStatus;
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

export function getStatus(status: TaskStatus) {
  switch (status) {
    case 'done':
      return 'Выполнено';
    case 'ready':
      return 'Ожидает выполнения';
    case 'taken':
      return 'Выполняется';
    case 'cancelled':
      return 'Отменено';
    default:
      return 'Неизвестно';
  }
}

export interface AllTaskFilters {
  startDate: Date;
  endDate: Date;
  kondor: number;
}

export type TaskFilters = Partial<AllTaskFilters>;
