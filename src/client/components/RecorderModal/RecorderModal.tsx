import * as React from 'react';
import { connect } from 'react-redux';

import Recorder from '@components/Recorder/RecorderEntry';
import { Modal } from '@features/Modal';
import { actions } from '@features/Modal/redux';
const { closeModal } = actions;

type OwnProps = {
  onSaveClick(audio: any): void;
}

type Props = OwnProps & typeof mapDispatch;

const mapDispatch = { closeModal };

const RecorderModal: React.FC<Props> = ({ closeModal, onSaveClick }) => {
  return (
    <Modal open={true} onClose={closeModal} remWidth={46}>
      <Modal.Header>Запись</Modal.Header>
      <Modal.Content>{<Recorder onSaveClick={onSaveClick} />}</Modal.Content>
      <Modal.Footer />
    </Modal>
  );
};

export default connect(
  null,
  mapDispatch
)(RecorderModal);
