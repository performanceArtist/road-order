export const CANCEL = {
  WITH_REASON: {
    REQUEST: 'CANCEL.WITH_REASON.REQUEST',
    SUCCESS: 'CANCEL.WITH_REASON.SUCCESS',
    FAILURE: 'CANCEL.WITH_REASON.FAILURE'
  },
  SEND_MARK: {
    REQUEST: 'CANCEL.SEND_MARK.REQUEST',
    SUCCESS: 'CANCEL.SEND_MARK.SUCCESS',
    FAILURE: 'CANCEL.SEND_MARK.FAILURE'
  }
};

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
