import * as React from 'react';
import { connect } from 'react-redux';

import { ModalMap, ModalPayload } from '@redux/modal/reducer';

const ModalManager = ({ modals }: { modals: Array<ModalPayload> }) => {
  const renderedModals = modals.map(
    (modalDescription: ModalPayload, index: number) => {
      const { modalType, modalProps = {} } = modalDescription;
      const ModalComponent = ModalMap[modalType];

      return <ModalComponent {...modalProps} key={modalType + index} />;
    }
  );

  return <>{renderedModals}</>;
};

const mapState = (state: { modals: Array<ModalPayload> }) => ({
  modals: state.modals
});

export default connect(mapState)(ModalManager);
