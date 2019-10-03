import { NEWTASK } from './actions';

type IState = {
  location: [number, number];
};

const initialState: IState = {
  location: [56.472596, 84.950367]
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case NEWTASK.LOCATION_SEARCH.SUCCESS:
      if (!payload) return state;
      return { ...state, location: payload };
    default:
      return state;
  }
}
