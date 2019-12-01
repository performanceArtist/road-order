import { DatabaseRouteMarkType, GPSCoordinates } from '@root/client/shared/types';

export type CancelTaskParams = {
  taskId: string,
  reason: DatabaseRouteMarkType | Blob,
  coordinates: GPSCoordinates
};
