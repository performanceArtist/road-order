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
    default:
      return state;
  }
}
