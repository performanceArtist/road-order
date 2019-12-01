import { Communication, initialCommunication } from '@shared/utils/redux-unit';
import { ServerTask } from '@shared/types';

export interface InitialState {
  tasks: ServerTask[];
  currentTaskId: number | null;
  getTasks: Communication,
  cancelTask: Communication,
}

export const initialState: InitialState = {
  tasks: [],
  currentTaskId: null,
  getTasks: initialCommunication,
  cancelTask: initialCommunication,
};
