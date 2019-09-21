import { RECORDER } from './actions';

type State = {
  status: 'pending' | 'ok' | 'error';
  error: null | string;
};

const initialState: State = {
  status: 'pending',
  error: null
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case RECORDER.SAVE_AUDIO.SUCCESS:
      return { ...state, status: 'ok' };
    case RECORDER.SAVE_AUDIO.FAILURE:
      return { ...state, status: 'error', error: payload };
    default:
      return state;
  }
}
