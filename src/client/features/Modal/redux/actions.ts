import { ModalName } from './reducer';

export const MODAL = {
  OPEN: 'MODAL.OPEN',
  CLOSE: 'MODAL.CLOSE'
};

export function openModal(modalType: ModalName, modalProps = {}) {
  return {
    type: MODAL.OPEN,
    payload: { modalType, modalProps }
  };
}

export function closeModal() {
  return {
    type: MODAL.CLOSE
  };
}
