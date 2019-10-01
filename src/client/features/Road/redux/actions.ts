export const ROAD = {
  MARK: {
    REQUEST: 'ROAD.MARK.REQUEST',
    SUCCESS: 'ROAD.MARK.SUCCESS',
    FAILURE: 'ROAD.MARK.FAILURE'
  }
};

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
