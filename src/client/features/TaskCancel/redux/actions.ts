import { DatabaseRouteMarkType, GPSCoordinates } from '@shared/types';
import { a, actionTree } from '@shared/utils';

export const CANCEL = actionTree('CANCEL')({
  WITH_REASON: a.api,
  SEND_MARK: a.api
});

export const cancelWithReason = (
  taskId: string,
  markType: DatabaseRouteMarkType,
  coordinates: GPSCoordinates
) => ({
  type: CANCEL.WITH_REASON.REQUEST,
  payload: {
    taskId,
    markType,
    coordinates
  }
});

export const cancelWithAudio = (
  taskId: string,
  audio: any,
  coordinates: GPSCoordinates
) => ({
  type: CANCEL.WITH_REASON.REQUEST,
  payload: {
    audio,
    markType: 'cancel_with-audio',
    taskId,
    coordinates
  }
});
