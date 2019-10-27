import { ServerTask } from '@shared/types';

import { TASK } from './actions';

export interface InitialState {
  tasks: ServerTask[];
  currentTaskId: number | null;
}

const initialState: InitialState = {
  tasks: [],
  currentTaskId: null
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case TASK.GET.SUCCESS:
      return { ...state, tasks: payload };
    case TASK.SET_CURRENT:
      return { ...state, currentTaskId: payload };
    case TASK.UPDATE_STATUS:
      const { id, status } = payload;
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === id ? { ...task, status } : task
        )
      };
    default:
      return state;
  }
}
