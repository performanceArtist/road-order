import { TASK } from './actions';
import { Task } from './types';

const initialState: { tasks: Array<Task> } = {
  tasks: []
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case TASK.GET.SUCCESS:
      return { ...state, tasks: state.tasks.concat(payload) };
    default:
      return state;
  }
}
