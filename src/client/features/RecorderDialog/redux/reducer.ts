import { CANCEL } from './actions';

type State = {
  cancelled: Array<string>;
};

const initialState: State = {
  cancelled: []
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case CANCEL.WITH_REASON.SUCCESS:
      return { ...state, cancelled: state.cancelled.concat(payload) };
    default:
      return state;
  }
}
