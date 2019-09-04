export const SERVER = {
  GET: {
    REQUEST: 'SERVER.GET.REQUEST',
    SUCCESS: 'SERVER.GET.SUCCESS',
    FAILURE: 'SERVER.GET.FAILURE'
  }
};

export const getRequest = () => ({
  type: SERVER.GET.REQUEST
});
