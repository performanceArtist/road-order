import * as React from 'react';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import Button from '@components/Button/Button';

import { openModal, closeModal } from '@redux/modal/actions';
import { cancelWithReason } from './redux/actions';

type OwnProps = {
  taskId: string;
};

type Props = OwnProps & typeof mapDispatch;

const CancelModal: React.FC<Props> = ({
  openModal,
  closeModal,
  cancelWithReason,
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
            <Button onClick={() => openModal('Recorder')}>
              Голосовой комментарий
            </Button>
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer />
    </Modal>
  );
};

const mapDispatch = { openModal, closeModal, cancelWithReason };

export default connect(
  null,
  mapDispatch
)(CancelModal);
