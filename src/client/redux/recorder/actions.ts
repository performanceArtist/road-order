export const RECORDER = {
  SAVE_AUDIO: {
    REQUEST: 'RECORDER.SAVE_AUDIO',
    SUCCESS: 'RECORDER.SAVE_AUDIO.SUCCESS',
    FAILURE: 'RECORDER.SAVE_AUDIO.FAILURE'
  }
};

export const saveAudio = (audio: any) => ({
  type: RECORDER.SAVE_AUDIO.REQUEST,
  payload: audio
});
