import { TaskFormData, GPSTrack, GPSCoordinates } from '@shared/types';

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
  ADD_ROUTE_POINT: 'ADD_ROUTE_POINT',
  REMOVE_LAST_ROUTE_POINT: 'REMOVE_LAST_ROUTE_POINT'
};

export const createTask = (formData: TaskFormData) => ({
  type: NEWTASK.POST.REQUEST,
  payload: formData
});

export const getLocation = (search: string) => ({
  type: NEWTASK.LOCATION_SEARCH.REQUEST,
  payload: search
});

export const addRoutePoint = (payload: GPSCoordinates) => ({
  type: NEWTASK.ADD_ROUTE_POINT,
  payload
});

export const removeLastRoutePoint = () => ({
  type: NEWTASK.REMOVE_LAST_ROUTE_POINT
});

export const getRoute = (points: GPSTrack) => ({
  type: NEWTASK.GET_ROUTE.REQUEST,
  payload: points
});
