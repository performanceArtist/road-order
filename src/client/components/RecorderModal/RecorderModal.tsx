import * as React from 'react';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import { canUseDOM } from '@client/utils';
import { closeModal } from '@redux/modal/actions';

let Recorder = () => <></>;
if (canUseDOM) {
  Recorder = require('@components/Recorder/Recorder').default;
}

type Props = typeof mapDispatch;

const RecorderModal: React.FC<Props> = ({ closeModal, onSaveClick }) => {
  return (
    <Modal open={true} onClose={closeModal} remWidth={46}>
      <Modal.Header>Запись</Modal.Header>
      <Modal.Content>{<Recorder onSaveClick={onSaveClick} />}</Modal.Content>
      <Modal.Footer />
    </Modal>
  );
};

const mapDispatch = { closeModal };

export default connect(
  null,
  mapDispatch
)(RecorderModal);
