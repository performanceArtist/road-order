import { a, actionTree } from '@shared/utils';

export const ROAD = actionTree('ROAD')({
  MARK: a.api
});

interface MarkRequestPayload {
  audio: any;
  taskId: string;
  latitude: number;
  longitude: number;
}

export const markRequest = (payload: MarkRequestPayload) => ({
  type: ROAD.MARK.REQUEST,
  payload
});
