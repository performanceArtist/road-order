import { TaskFilters } from '@root/client/shared/types';

export const TASK = {
  SET_CURRENT: 'TASK.SET_CURRENT',
  GET: {
    REQUEST: 'TASK.GET.REQUEST',
    SUCCESS: 'TASK.GET.SUCCESS',
    FAILURE: 'TASK.GET.FAILURE'
  }
};

export const getTasks = (filters?: TaskFilters) => ({
  type: TASK.GET.REQUEST,
  payload: filters
});

export const setCurrentTask = (id: number) => ({
  type: TASK.SET_CURRENT,
  payload: id
});
