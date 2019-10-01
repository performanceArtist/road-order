export const NEWTASK = {
  POST: {
    REQUEST: 'NEWTASK.POST.REQUEST',
    SUCCESS: 'NEWTASK.POST.SUCCESS',
    FAILURE: 'NEWTASK.POST.FAILURE'
  }
};

export const createTask = (formData: any) => ({
  type: NEWTASK.POST.REQUEST,
  payload: formData
});
