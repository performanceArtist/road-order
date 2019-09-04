import * as React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import StatusBar from '@components/StatusBar/StatusBar';
import DeviceTable from '@components/DeviceTable/DeviceTable';

import { openModal } from '@redux/modal/actions';

type Props = typeof mapDispatch;

const Index: React.FC<Props> = ({ openModal }) => (
  <div>
    <Helmet>
      <title>Homepage</title>
    </Helmet>
    <div className="index">
      <StatusBar />
      <div className="index__device-table">
        <DeviceTable
          devices={[
            { name: 'Плотномер', status: 'complete' },
            { name: 'Георадар', status: 'complete' },
            { name: 'Профилометр', status: 'complete' },
            { name: 'Система позиционирования', status: 'failed' },
            { name: 'Система фото-видео фиксации' }
          ]}
        />
      </div>
      <button onClick={() => openModal('Error')}>Test</button>
    </div>
  </div>
);

const mapDispatch = { openModal };

export default connect(
  null,
  mapDispatch
)(Index);
