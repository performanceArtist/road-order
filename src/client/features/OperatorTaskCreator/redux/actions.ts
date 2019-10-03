export const NEWTASK = {
  POST: {
    REQUEST: 'NEWTASK.POST.REQUEST',
    SUCCESS: 'NEWTASK.POST.SUCCESS',
    FAILURE: 'NEWTASK.POST.FAILURE'
  },
  LOCATION_SEARCH: {
    REQUEST: 'NEWTASK.LOCATION_SEARCH.REQUEST',
    SUCCESS: 'NEWTASK.LOCATION_SEARCH.SUCCESS',
    FAILURE: 'NEWTASK.LOCATION_SEARCH.FAILURE'
  }
};

export const createTask = (formData: any) => ({
  type: NEWTASK.POST.REQUEST,
  payload: formData
});

export const getLocation = (search: string) => ({
  type: NEWTASK.LOCATION_SEARCH.REQUEST,
  payload: search
});
