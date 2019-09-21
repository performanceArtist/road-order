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

const RecorderModal: React.FC<Props> = ({ closeModal }) => {
  return (
    <Modal open={true} onClose={closeModal} maxWidthPercentage={53}>
      <Modal.Header>Запись</Modal.Header>
      <Modal.Content>{<Recorder />}</Modal.Content>
      <Modal.Footer />
    </Modal>
  );
};

const mapDispatch = { closeModal };

export default connect(
  null,
  mapDispatch
)(RecorderModal);
