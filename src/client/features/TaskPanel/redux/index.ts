import { reduxUnit, makeApiHandler } from '@shared/utils/redux-unit';
import { ServerTask, TaskStatus } from '@root/client/shared/types';

import { initialState } from './initial';
import { CancelTaskParams } from './types';

const unit = reduxUnit(initialState, { typePrefix: 'TASK' });
const { actions, reducer } = unit({
  setCurrentTask: (state) => (taskId: number) => ({ ...state, currentTaskId: taskId }),
  updateTaskStatus: (state) => ({ id, status }: { status: TaskStatus, id: number }) =>
    ({
      ...state,
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, status } : task
    )}),
  addTask: (state) => (task: ServerTask) => ({ ...state, tasks: state.tasks.concat(task) }),
  getTasks: makeApiHandler()({
    communication: 'getTasks',
    onSuccess: (state) => (tasks: ServerTask[]) => ({ ...state, tasks })
  }),
  cancelTask: makeApiHandler<CancelTaskParams>()({
    communication: 'cancelTask'
  }),
});

export { actions as taskActions, reducer as tasksReducer };
