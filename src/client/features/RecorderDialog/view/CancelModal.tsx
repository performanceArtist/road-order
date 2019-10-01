import * as React from 'react';
import { connect } from 'react-redux';

import { Modal } from '@features/Modal';
import { actions as modalActions } from '@features/Modal/redux';
const { openModal, closeModal } = modalActions;
import Button from '@elements/Button/Button';

import { actions } from '../redux';
const { cancelWithReason, cancelWithAudio } = actions;

type OwnProps = {
  taskId: string;
};

type Props = OwnProps & typeof mapDispatch;

const mapDispatch = {
  openModal,
  closeModal,
  cancelWithReason,
  cancelWithAudio
};

const CancelModal: React.FC<Props> = ({
  openModal,
  closeModal,
  cancelWithReason,
  cancelWithAudio,
  taskId
}) => {
  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>Причина отмены</Modal.Header>
      <Modal.Content>
        <div className="cancel-modal">
          <div className="cancel-modal__generic">
            <div className="cancel-modal__button">
              <Button
                onClick={() => {
                  cancelWithReason(taskId, 'road-works');
                  closeModal();
                }}
              >
                Дорожные работы
              </Button>
            </div>
            <div className="cancel-modal__button">
              <Button
                onClick={() => {
                  cancelWithReason(taskId, 'car-crash-ahead');
                  closeModal();
                }}
              >
                Авария на полосе
              </Button>
            </div>
            <div className="cancel-modal__button">
              <Button
                onClick={() => {
                  cancelWithReason(taskId, 'mechanical-failure');
                  closeModal();
                }}
              >
                Неисправность автомобиля
              </Button>
            </div>
          </div>
          <div className="cancel-modal__voice">
            <Button
              onClick={() =>
                openModal('Recorder', {
                  onSaveClick: audio => {
                    cancelWithAudio(taskId, audio);
                    closeModal();
                  }
                })
              }
            >
              Голосовой комментарий
            </Button>
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer />
    </Modal>
  );
};

export default connect(
  null,
  mapDispatch
)(CancelModal);
