import { SERVER } from './actions';
import { ApiStatus } from './types';

const initialState: ApiStatus = {
  response: null,
  fetching: true
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case SERVER.GET.SUCCESS:
      return {
        fetching: false,
        response: payload
      };
    default:
      return state;
  }
}
