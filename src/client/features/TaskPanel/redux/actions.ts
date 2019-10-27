import { TaskFilters, ApiRequest, TaskStatus, ServerTask } from '@shared/types';
import { a, actionTree } from '@shared/utils';

export const TASK = actionTree('TASK')({
  SET_CURRENT: a.plain,
  UPDATE_STATUS: a.plain,
  ADD: a.plain,
  GET: a.api
});

export const getTasks = (filters?: TaskFilters): ApiRequest => ({
  type: TASK.GET.REQUEST,
  payload: filters
});

export const setCurrentTask = (id: number) => ({
  type: TASK.SET_CURRENT,
  payload: id
});

export const updateTaskStatus = (payload: {
  status: TaskStatus;
  id: number;
}) => ({
  type: TASK.UPDATE_STATUS,
  payload
});

export const addTask = (task: ServerTask) => ({
  type: TASK.ADD,
  payload: task
});
