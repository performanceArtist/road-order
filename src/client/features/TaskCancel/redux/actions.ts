import { a, actionTree } from '@shared/utils';

export const CANCEL = actionTree('CANCEL')({
  WITH_REASON: a.api,
  SEND_MARK: a.api
});

export const cancelWithReason = (
  taskId: string,
  reason: 'road-works' | 'car-crash-ahead' | 'mechanical-failure'
) => ({
  type: CANCEL.WITH_REASON.REQUEST,
  payload: {
    taskId,
    reason
  }
});

export const cancelWithAudio = (taskId: string, audio: any) => ({
  type: CANCEL.WITH_REASON.REQUEST,
  payload: {
    audio,
    reason: 'in-audio',
    taskId
  }
});
