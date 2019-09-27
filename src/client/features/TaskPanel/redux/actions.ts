export const TASK = {
  SAVE: 'TASK.SAVE',
  REMOVE: 'TASK.REMOVE',
  SET_CURRENT: 'TASK.SET_CURRENT',
  ADD: 'TASK.ADD',
  UPDATE: 'TASK.UPDATE',
  GET: {
    REQUEST: 'TASK.GET.REQUEST',
    SUCCESS: 'TASK.GET.SUCCESS',
    FAILURE: 'TASK.GET.FAILURE'
  },
  POST: {
    REQUEST: 'TASK.POST.REQUEST',
    SUCCESS: 'TASK.POST.SUCCESS',
    FAILURE: 'TASK.POST.FAILURE'
  }
};

export const getTask = () => ({
  type: TASK.GET.REQUEST
});

export const setCurrentTask = (id: string) => ({
  type: TASK.SET_CURRENT,
  payload: id
});
