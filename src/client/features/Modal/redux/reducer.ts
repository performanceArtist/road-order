import { MODAL } from './actions';

import ErrorModal from '@components/ErrorModal/ErrorModal';
import { CancelModal } from '@root/client/features/RecorderDialog';
import RecorderModal from '@components/RecorderModal/RecorderModal';

import { ConnectedComponentClass } from 'react-redux';

export const ModalMap: Record<
  string,
  ConnectedComponentClass<any, any> | React.SFC | React.Component
> = {
  Error: ErrorModal,
  Cancel: CancelModal,
  Recorder: RecorderModal
};

export interface ModalPayload {
  modalType: string;
  modalProps: any;
}

interface ModalAction {
  type: string;
  payload: ModalPayload;
}

const initialState: Array<ModalPayload> = [];

export default function modalReducer(
  state = initialState,
  { type, payload }: ModalAction
) {
  switch (type) {
    case MODAL.OPEN:
      return state.concat(payload);
    case MODAL.CLOSE:
      return state.slice(0, -1);
    default:
      return state;
  }
}