import * as React from 'react';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import Button from '@components/Button/Button';

import { openModal, closeModal } from '@redux/modal/actions';

type Props = typeof mapDispatch;

const CancelModal: React.FC<Props> = ({ openModal, closeModal }) => {
  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>Причина отмены</Modal.Header>
      <Modal.Content>
        <div className="cancel-modal">
          <div className="cancel-modal__generic">
            <div className="cancel-modal__button">
              <Button>Дорожные работы</Button>
            </div>
            <div className="cancel-modal__button">
              <Button>Авария на полосе</Button>
            </div>
            <div className="cancel-modal__button">
              <Button>Неисправность автомобиля</Button>
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

const mapDispatch = { openModal, closeModal };

export default connect(
  null,
  mapDispatch
)(CancelModal);
