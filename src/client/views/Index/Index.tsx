import * as React from 'react';
import Helmet from 'react-helmet';

import StatusBar from '@components/StatusBar/StatusBar';
import DeviceTable from '@components/DeviceTable/DeviceTable';

const Index: React.FC<{}> = () => (
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
    </div>
  </div>
);

export default Index;
