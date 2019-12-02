import { IO } from './actions';

type InitialState = {
  channelStatus: 'on' | 'off';
  serverStatus: 'unknown' | 'on' | 'off';
};

const initialState: InitialState = {
  channelStatus: 'off',
  serverStatus: 'unknown'
};

export default function reducer(
  state = initialState,
  { type }: { type: string }
) {
  switch (type) {
    case IO.CHANNEL_ON:
      return { ...state, channelStatus: 'on' };
    case IO.CHANNEL_OFF:
      return { ...state, channelStatus: 'off', serverStatus: 'unknown' };
    case IO.SERVER_OFF:
      return { ...state, serverStatus: 'off' };
    case IO.SERVER_ON:
      return { ...state, serverStatus: 'on' };
    default:
      return state;
  }
}
