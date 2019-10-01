export const TASK = {
  SET_CURRENT: 'TASK.SET_CURRENT',
  GET: {
    REQUEST: 'TASK.GET.REQUEST',
    SUCCESS: 'TASK.GET.SUCCESS',
    FAILURE: 'TASK.GET.FAILURE'
  }
};

export const getTask = () => ({
  type: TASK.GET.REQUEST
});

export const setCurrentTask = (id: string) => ({
  type: TASK.SET_CURRENT,
  payload: id
});
