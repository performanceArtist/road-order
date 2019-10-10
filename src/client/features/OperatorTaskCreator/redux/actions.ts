import { TaskFormData } from "@root/client/shared/types";

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
  },
  GET_ROUTE: {
    REQUEST: 'NEWTASK.GET_ROUTE.REQUEST',
    SUCCESS: 'NEWTASK.GET_ROUTE.SUCCESS',
    FAILURE: 'NEWTASK.GET_ROUTE.FAILURE'
  },
  SET_FROM: 'NEWTASK.SET_FROM',
  SET_TO: 'NEWTASK.SET_TO'
};

export const createTask = (formData: TaskFormData) => ({
  type: NEWTASK.POST.REQUEST,
  payload: formData
});

export const getLocation = (search: string) => ({
  type: NEWTASK.LOCATION_SEARCH.REQUEST,
  payload: search
});

export const setFrom = (payload: [number, number]) => ({
  type: NEWTASK.SET_FROM,
  payload
});

export const setTo = (payload: [number, number]) => ({
  type: NEWTASK.SET_TO,
  payload
});

export const getRoute = (from: [number, number], to: [number, number]) => ({
  type: NEWTASK.GET_ROUTE.REQUEST,
  payload: { from, to }
});
