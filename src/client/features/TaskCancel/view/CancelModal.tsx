import * as React from 'react';
import { connect } from 'react-redux';

import { Modal } from '@features/Modal';
import { actions as modalActions } from '@features/Modal/redux';
const { openModal, closeModal } = modalActions;
import { Button } from '@shared/view';
import { GPSCoordinates } from '@shared/types';

import { actions } from '../redux';
import { RootState } from '@root/client/redux/driver/reducer';
const { cancelWithReason, cancelWithAudio } = actions;

type OwnProps = {
  taskId: string;
};

type Props = OwnProps & typeof mapDispatch & MapState;

type MapState = {
  condor: { speed: number; coordinates: GPSCoordinates };
};

const mapState = (state: RootState): MapState => ({
  condor: state.condor
});

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
  taskId,
  condor: { coordinates }
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
                  cancelWithReason(taskId, 'cancel_roadworks', coordinates);
                  closeModal();
                }}
              >
                Дорожные работы
              </Button>
            </div>
            <div className="cancel-modal__button">
              <Button
                onClick={() => {
                  cancelWithReason(
                    taskId,
                    'cancel_car-crash-ahead',
                    coordinates
                  );
                  closeModal();
                }}
              >
                Авария на полосе
              </Button>
            </div>
            <div className="cancel-modal__button">
              <Button
                onClick={() => {
                  cancelWithReason(
                    taskId,
                    'cancel_condor-malfunction',
                    coordinates
                  );
                  closeModal();
                }}
              >
                Неисправность автомобиля
              </Button>
            </div>
          </div>
          <div className="cancel-modal__audio">
            <Button
              onClick={() => {
                openModal('Recorder', {
                  onSaveClick: (audio: any) => {
                    cancelWithAudio(taskId, audio, coordinates);
                    closeModal();
                    closeModal();
                  }
                });
              }}
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
  mapState,
  mapDispatch
)(CancelModal);
