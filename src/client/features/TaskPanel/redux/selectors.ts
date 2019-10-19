import { RootState } from "@root/client/redux/driver/reducer";
import { ServerTask } from "@root/client/shared/types";

import { InitialState } from './reducer';

export function selectBranch(state: RootState): InitialState {
  return state.tasks;
}

export function selectTasks(state: RootState): ServerTask[] {
  return selectBranch(state).tasks;
}

export function selectCurrentTaskId(state: RootState): number | null {
  return selectBranch(state).currentTaskId;
}

export function selectCurrentTask(state: RootState) {
  const currentTaskId = selectCurrentTaskId(state)
  const tasks = selectTasks(state);

  return tasks.find(({ id }) => id === currentTaskId);
}
