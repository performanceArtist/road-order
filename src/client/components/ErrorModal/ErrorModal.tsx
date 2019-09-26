import * as React from 'react';
import { connect } from 'react-redux';

import { Modal } from '@features/Modal';
import { actions } from '@features/Modal/redux';
const { closeModal } = actions;

type Props = typeof mapDispatch;

const mapDispatch = { closeModal };

const ErrorModal: React.FC<Props> = ({ closeModal }) => {
  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>Ошибка</Modal.Header>
      <Modal.Content>
        <div>Test</div>
      </Modal.Content>
      <Modal.Footer />
    </Modal>
  );
};

export default connect(
  null,
  mapDispatch
)(ErrorModal);
